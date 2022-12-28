// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StatusCode } from './constants';

export const getThreadId = async (): Promise<string> => {
  try {
    const requestOptions = {
      method: 'GET'
    };

    const response = await fetch('/getThreadId', requestOptions);
    if (response.status === StatusCode.OK) {
      return await response.text();
    } else {
      throw new Error('Failed to get the existing thread ' + response.status);
    }
  } catch (error) {
    console.error('Failed to get the existing thread, Error: ', error);
    throw new Error('Failed to get the existing thread');
  }
};
