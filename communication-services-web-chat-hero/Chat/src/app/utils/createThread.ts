// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StatusCode } from './constants';
//(userId: string, token: string)
export const createThread = async (groupChatName: string): Promise<string> => {
  try {
    const requestOptions = {
      method: 'POST'
    };
    //createThread
    const response = await fetch(`/createThread/${groupChatName}`, requestOptions);
    if (response.status === StatusCode.OK) {
      return await response.text();
    } else {
      throw new Error('Failed at creating thread ' + response.status);
    }
  } catch (error) {
    console.error('Failed creating thread, Error: ', error);
    throw new Error('Failed at creating thread');
  }
};
