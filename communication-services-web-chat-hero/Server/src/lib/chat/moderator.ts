// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatClient, CreateChatThreadOptions, CreateChatThreadRequest } from '@azure/communication-chat';
import { getEndpoint } from '../envHelper';
import { threadIdToModeratorCredentialMap } from './threadIdToModeratorTokenMap';
import { createUser, getToken } from '../identityClient';
import groupValuesOfChat from '../../thread-id-repo/group-threads-copy.json';
import * as express from 'express';
import { Buffer } from 'buffer';

export var threadIdValue = '';

export const createThread = async (topicName?: string): Promise<string> => {
  const user = await createUser();

  console.log('Came to the CreateThread ', user);

  const credential = new AzureCommunicationTokenCredential({
    tokenRefresher: async () => (await getToken(user, ['chat', 'voip'])).token,
    refreshProactively: true
  });
  const chatClient = new ChatClient(getEndpoint(), credential);

  const request: CreateChatThreadRequest = {
    topic: topicName ?? 'Your Chat sample'
  };
  const options: CreateChatThreadOptions = {
    participants: [
      {
        id: {
          communicationUserId: user.communicationUserId
        }
      }
    ]
  };
  const result = await chatClient.createChatThread(request, options);

  console.log('Chat thread is created ', result);

  threadIdValue = result.chatThread?.id;

  const threadID = threadIdValue;
  //const threadID = result.chatThread?.id;
  if (!threadID) {
    throw new Error(`Invalid or missing ID for newly created thread ${result.chatThread}`);
  }
  console.log('Before calling the saveThreadID function ', user.communicationUserId);
  if (!threadIdToModeratorCredentialMap.has(threadID)) threadIdToModeratorCredentialMap.set(threadID, credential);
  await saveThreadID(threadID, topicName, user.communicationUserId);
  return threadID;
};

const saveThreadID = async (threadID?: string, newgroupName?: string, userIdentifierValue?: string) => {
  try {
    const fs = require('fs');

    console.log('Came to the saveThreadID');

    let groupsjson = fs.readFileSync('src/thread-id-repo/group-threads-copy.json', 'utf-8');
    let groupsVariable = JSON.parse(groupsjson);
    if (groupsVariable.groups.some((obj: object) => obj.hasOwnProperty(newgroupName))) {
      var groupChatVar: { groupName: string; threadIdValue: string; userIdentifier: string } =
        groupsVariable.groups.filter(
          (obj: { groupName: string; threadIdValue: string; userIdentifier: string }) => obj.groupName === newgroupName
        )[0];
      groupChatVar.threadIdValue = threadID;
      groupChatVar.userIdentifier = userIdentifierValue;
    } else {
      groupsVariable.groups.push({
        groupName: newgroupName,
        threadIdValue: threadID,
        userIdentifier: userIdentifierValue
      });
    }

    console.log('Before writing the changes to the file.');
    groupsjson = JSON.stringify(groupsVariable);

    console.log('Value which we are saving is', groupsjson);

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(
        'src/thread-id-repo/group-threads-copy.json',
        Buffer.from(groupsjson, 'utf-8'),
        (err: object, data: object) => {
          if (err) {
            reject();
            console.error('Error is occured in the writeFile callback function ', err);
            return console.log(err);
          }
          //fs.close();
          console.error('No error is occured in the writeFile callback function ', err);
          resolve();
          //console.log('Write file data', data);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
/*
const app = express
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)
*/
