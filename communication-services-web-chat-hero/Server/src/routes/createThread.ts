// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { createThread } from '../lib/chat/moderator';

const router = express.Router();

/**
 * route: /createThread/
 *
 * purpose: Create a new chat thread.
 *
 * @returns The new threadId as string
 *
 */

router.post('/:groupChatName', async function (req, res, next) {
  console.log('Came to the createThread Main request');
  res.send(await createThread(req.params['groupChatName']));
});

export default router;
