// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from 'console';
import * as express from 'express';
import groupValuesOfChat from '../thread-id-repo/group-threads-copy.json';

import { threadIdToModeratorCredentialMap } from '../lib/chat/threadIdToModeratorTokenMap';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { createUser, getToken } from '../lib/identityClient';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import { stringify } from 'querystring';

const router = express.Router();

/**
 * route: /getGroupChatId/
 *
 * purpose: Check if thread is valid for given threadId.
 *
 *  * @param groupName: group Name of the Chat
 *
 * @returns status 200 if thread is valid and status 404 if thread is
 * invalid.
 */
//req.query.groupName as string
router.get('/', async (req, res, next) => res.send(await groupThreadId((req.query.groupName as string) ?? '')));
// router.get('/:groupName', async function (req, res, next) {
//   res.send(groupThreadId);
// });

const groupThreadId = async (groupName?: string): Promise<string> => {
  // const user = await createUser();

  // const credential = new AzureCommunicationTokenCredential({
  //   tokenRefresher: async () => (await getToken(user, ['chat', 'voip'])).token,
  //   refreshProactively: true
  // });

  const fs = require('fs');

  console.log('Came to the saveThreadID');

  let groupsjson = fs.readFileSync('src/thread-id-repo/group-threads-copy.json', 'utf-8');
  let groupValuesOfChat = JSON.parse(groupsjson);

  var groupChatVar: { groupName: string; threadIdValue: string; userIdentifier: string } =
    groupValuesOfChat.groups.filter(
      (x: { groupName: string; threadIdValue: string; userIdentifier: string }) => x.groupName === groupName
    )[0];
  var threadIdValueLocal = groupChatVar.threadIdValue;
  var userIdentifierVar: string = groupChatVar.userIdentifier;

  const user = { communicationUserId: userIdentifierVar };
  //new Object({ communicationUserId: { userIdentifierVar } }) as CommunicationUserIdentifier; //await createUser();
  //createUser();
  // communicationUserId: string;
  const credential = new AzureCommunicationTokenCredential({
    tokenRefresher: async () => (await getToken(user, ['chat', 'voip'])).token,
    refreshProactively: true
  });
  threadIdToModeratorCredentialMap.set(threadIdValueLocal, credential);
  console.log(' setting threadIdToModeratorCredentialMap  ', threadIdToModeratorCredentialMap);
  console.log('returning the threadid in group chat ', threadIdValueLocal);
  return threadIdValueLocal;
};

export default router;
