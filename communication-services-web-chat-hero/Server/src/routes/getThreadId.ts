// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { threadIdValue } from '../lib/chat/moderator';

const router = express.Router();

/**
 * route: /getThreadId/
 *
 * purpose: Check if thread is valid for given threadId.
 *
 *
 * @returns status 200 if thread is valid and status 404 if thread is
 * invalid.
 */

router.get('/', async function (req, res, next) {
  res.send(threadIdValue);
});

export default router;
