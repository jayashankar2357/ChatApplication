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
 * route: /getGroupNames/
 *
 * purpose: Get list of available group names.
 *
 *  
 *
 * @returns status 200 if thread is valid and status 404 if thread is
 * invalid.
 */
//router.get('/', async (req, res, next) => res.send(await groupNames()));
router.get('/',  (req, res, next) => res.send(groupNames()));
// router.get('/:groupName', async function (req, res, next) {
//   res.send(groupThreadId);
// });

//const groupNames = async (): Promise<string[]> => {
  //const groupNames = async (): Promise<string> => {
  const groupNames = function()  {
  const fs = require('fs');

  console.log('Came to the groupNames');

  let groupsjson = fs.readFileSync('src/thread-id-repo/group-threads-copy.json', 'utf-8');
  let groupValuesOfChat = JSON.parse(groupsjson);


  //var groupChatNameListArray =   groupValuesOfChat.groups;
  const groupChatNameListArray: string[]  =  [];
  var groupChatNameConcat :string = '';

  for (let index = 0; index < groupValuesOfChat.groups.length; index++) {
    groupChatNameListArray.push(groupValuesOfChat.groups[index].groupName);
    // if(groupChatNameConcat)
    // {
    groupChatNameConcat += groupValuesOfChat.groups[index].groupName+',';
    // }
  }

  console.log('After getting groupChatNameListArray ', groupChatNameListArray);
  console.log('groupChatNameConcat:'+groupChatNameConcat);
  //return groupChatNameListArray;
  return groupChatNameConcat;
  
};

export default router;
