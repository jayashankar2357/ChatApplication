// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StatusCode } from './constants';
//import CreatedGroupList from '../CreatedGroupList';

const groupNames = async (groupNames: string) => {
  const groupNamesConcat = groupNames;
  var groupNamesArray = groupNamesConcat.split(',').filter((x) => x !== '');
  console.log('groupNamesArray:' + groupNamesArray);
  return groupNamesArray;
};

//export const getGroupNames = async function()  {
export const getGroupNames = async (): Promise<string[]> => {
  try {
    const requestOptions = {
      method: 'GET'
    };
    //const getTokenResponse = await fetch('/token?scope=chat', getTokenRequestOptions);
    const response = await fetch(`/getGroupNames`, requestOptions);
    if (response.status === StatusCode.OK) {
      console.log(response);
      //CreatedGroupList(groupNames(await response.text()));
      return groupNames(await response.text());
      //return await response.text();
    } else {
      throw new Error('Failed to get the group Chat Names ' + response.status);
    }
  } catch (error) {
    console.error('Failed to get the group group Chat Names, Error: ', error);
    throw new Error('Failed to get the group group Chat Names');
  }
};
