// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChatClient } from '@azure/communication-chat';
import * as express from 'express';
import { getEndpoint } from '../lib/envHelper';
import { threadIdToModeratorCredentialMap } from '../lib/chat/threadIdToModeratorTokenMap';

const router = express.Router();
interface AddUserParam {
  Id: string;
  DisplayName: string;
}

/**
 * route: /addUser/[threadId]
 *
 * purpose: Add the user to the chat thread with given threadId.
 *
 * @param threadId: id of the thread to which user needs to be added
 * @param id: id of the user as string
 * @param displayName: display name of the user as string
 *
 */

router.post('/:threadId', async function (req, res, next) {
  try {
    console.log('Came to the addUser.ts', req.body);
    const addUserParam: AddUserParam = req.body;
    const threadId = req.params['threadId'];
    console.log('getting threadIdToModeratorCredentialMap ', threadIdToModeratorCredentialMap);
    console.log('getting threadid in adduser ', threadId);
    const moderatorCredential = threadIdToModeratorCredentialMap.get(threadId);
    console.log('moderatorCredential is ', moderatorCredential);

    /*const createCredential = new AzureCommunicationTokenCredential({
    tokenRefresher: async () => (await getToken(user, ['chat', 'voip'])).token,
    refreshProactively: true
  });*/
    //const createCredential =

    const chatClient = new ChatClient(getEndpoint(), moderatorCredential);
    console.log('ChatClient is created ', chatClient);
    const chatThreadClient = await chatClient.getChatThreadClient(threadId);
    console.log('chatThreadClient is created ', chatThreadClient);
    await chatThreadClient.addParticipants({
      participants: [
        {
          id: { communicationUserId: addUserParam.Id },
          displayName: addUserParam.DisplayName
        }
      ]
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
