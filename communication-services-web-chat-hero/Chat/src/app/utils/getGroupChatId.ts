// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StatusCode } from './constants';

export const getGroupChatId = async (selectedGroupChatValue: string): Promise<string> => {
  try {
    const requestOptions = {
      method: 'GET'
    };
    //const getTokenResponse = await fetch('/token?scope=chat', getTokenRequestOptions);
    const response = await fetch(`/getGroupChatId?groupName=${selectedGroupChatValue}`, requestOptions);
    if (response.status === StatusCode.OK) {
      return await response.text();
    } else {
      throw new Error('Failed to get the group thread id ' + response.status);
    }
  } catch (error) {
    console.error('Failed to get the group thread id, Error: ', error);
    throw new Error('Failed to get the group thread id');
  }
};
