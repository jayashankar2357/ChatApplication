// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  
  Icon,
  
  Link,
  List,
  PrimaryButton,
  Spinner,
  Stack,
  Text,
  mergeStyles
} from '@fluentui/react';

import {
  buttonStyle,
  buttonWithIconStyles,
  configContainerStackTokens,
  configContainerStyle,
  containerTokens,
  containerStyle,
  headerStyle,
  listIconStyle,
  listItemStackTokens,
  listItemStyle,
  
  listStyle,
  nestedStackTokens,
  infoContainerStyle,
  infoContainerStackTokens,
  videoCameraIconStyle
} from './styles/HomeScreen.styles';
import { useTheme } from '@azure/communication-react';

import { Chat20Filled} from '@fluentui/react-icons';
//import heroSVG from '../assets/hero.svg';
//import heroDarkModeSVG from '../assets/hero_dark.svg';
import { getExistingThreadIdFromURL } from './utils/getExistingThreadIdFromURL';
import { getGroupChatId } from './utils/getGroupChatId';
import { createThread } from './utils/createThread';
//import { ThemeSelector } from './theming/ThemeSelector';
//import { useSwitchableFluentTheme } from './theming/SwitchableFluentThemeProvider';
import GroupChatName from './GroupChatName';
import CreatedGroupList from './CreatedGroupList';
import { getGroupNames } from './utils/getGroupNames';
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import React, { useCallback, useState,useEffect } from 'react';
//import React, { useEffect, useState } from 'react';

// const imageStyleProps: IImageStyles = {
//   image: {
//     height: '100%'
//   },

//   root: {}
// };

const HOMESCREEN_SHOWING_START_CHAT_BUTTON = 1;
const HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD = 2;

//var groupList = async () =>{  await getGroupNames()};
var groupChatNameHome='';
var selectedGroupChatValue = '';
/**
 * HomeScreen has two states:
 * 1. Showing start chat button
 * 2. Showing spinner after clicking start chat
 *
 * @param props
 */
export default (props): JSX.Element => {
  const spinnerLabel = 'Creating a new chat thread...';
  const iconName = 'SkypeCircleCheck';
  const headerTitle = 'Welcome '+props.name+'!';
  const startChatButtonText = 'Start chat';
  const joinGroupButtonText = 'Join Group Chat';
  const listItems = [
    // 'Launch a conversation with a single click',
    // 'Real-time messaging with indicators',
    // 'Invite up to 250 participants',
    // 'Learn more about this'
  ];

  const [homeScreenState, setHomeScreenState] = useState<number>(HOMESCREEN_SHOWING_START_CHAT_BUTTON);
  //const { currentTheme } = useSwitchableFluentTheme();
  
  //const groupList = async (): Promise<string []> => { return await getGroupNames();};
  var [groupList,setGroupList] = React.useState<string[]>(['reewre','Jay']);
  useEffect(() => {
    getGroupNames()
    .then(data =>
      setGroupList(data)
    );
   }, []); 

  //const imageProps = { src: currentTheme.name === 'Light' ? heroSVG.toString() : heroDarkModeSVG.toString() };

  //var groupListChatArray : string[] = [];
  const themePrimary = useTheme().palette.themePrimary;

  const callbackToConnectGroupListAndChat = useCallback((groupNameValue : string) => {    
    groupChatNameHome = groupNameValue;
  },[themePrimary]);

  const callbackToGetTheSelectedGroupValue = useCallback((value) => {
    selectedGroupChatValue = value;
    console.log('selectedGroupChatValue:'+selectedGroupChatValue);
  },[themePrimary]);

  //var groupList =  getGroupNames();
  const onCreateThread = async (): Promise<void> => {
   
    

    //groupListChatArray= [...groupListChatArray, groupChatNameHome];  
    setGroupList([...groupList, groupChatNameHome]); 
    //<CreatedGroupList groupArray = {{array: groupListChatArray,callback:callbackToGetTheSelectedGroupValue.bind(this)}}/>

    if(groupChatNameHome === '')
    {
      alert('Enter the value of the group Chat before clicking the Start Chart/')
      return;
    }     

    const exisitedThreadId = await getExistingThreadIdFromURL();//getExistingThreadIdFromURL();
    setHomeScreenState(HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD);

    if (exisitedThreadId && exisitedThreadId.length > 0) {
      window.location.href += `?threadId=${exisitedThreadId}`;
      console.log(window.location.href);
      return;
    }

    const threadId = await createThread(groupChatNameHome as string);
    if (!threadId) {
      console.error('Failed to create a thread, returned threadId is undefined or empty string');
      return;
    } else {
      window.location.href += `?threadId=${threadId}`;
    }
  };

  const onJoinGroup = async (): Promise<void> => {
    if(selectedGroupChatValue === '')
    return;
    //const chatGroups =await getGroupNames();
    const exisitedThreadId = await getGroupChatId(selectedGroupChatValue);//await getThreadId();//getExistingThreadIdFromURL();
    setHomeScreenState(HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD);

    if (exisitedThreadId && exisitedThreadId.length > 0) {
      window.location.href += `?threadId=${exisitedThreadId}`;     
      console.log(window.location.href);
      return;
    }
  };

  const displayLoadingSpinner = (spinnerLabel: string): JSX.Element => {
    return <Spinner label={spinnerLabel} ariaLive="assertive" labelPosition="top" />;
  };

  

  const onRenderListItem = useCallback(
    (item?: string, index?: number): JSX.Element => {
      const listText =
        index !== 3 ? (
          <Text>{item}</Text>
        ) : (
          <Text>
            {item}{' '}
            <Link href="https://docs.microsoft.com/azure/communication-services/overview" aria-label={`${item} sample`}>
              {'sample'}
            </Link>
          </Text>
        );

      return (
        <Stack horizontal tokens={listItemStackTokens} className={listItemStyle}>
          <Icon className={mergeStyles(listIconStyle, { color: themePrimary })} iconName={iconName} />
          {listText}
        </Stack>
      );
    },
    [themePrimary]
  );
  

 
  const displayHomeScreen = (): JSX.Element => {
    return (
      <Stack
        horizontal
        wrap
        horizontalAlign="center"
        verticalAlign="center"
        tokens={containerTokens}
        className={containerStyle}
        
      >
        <Stack className={infoContainerStyle} tokens={infoContainerStackTokens}>
          <Text role={'heading'} aria-level={1} className={headerStyle}>
            {headerTitle}
          </Text>
          <Stack className={configContainerStyle} tokens={configContainerStackTokens}>
            <Stack tokens={nestedStackTokens}>
              <List className={listStyle} items={listItems} onRenderCell={onRenderListItem} />
            </Stack>
            <GroupChatName testCallback={callbackToConnectGroupListAndChat.bind(this)}/>
            {<PrimaryButton
              id="startChat"
              aria-label="Start chat"
              text={startChatButtonText}
              className={buttonStyle}
              styles={buttonWithIconStyles}
              onClick={() => {
                onCreateThread();
              }}
              onRenderIcon={() => <Chat20Filled className={videoCameraIconStyle} />}
            />}
            
            <CreatedGroupList groupArray = {{array: groupList,callback: callbackToGetTheSelectedGroupValue.bind(this)}}/>
            <PrimaryButton
              id="joinGroup"
              aria-label="Join Group"
              text={joinGroupButtonText}
              className={buttonStyle}
              styles={buttonWithIconStyles}
              onClick={() => {
                onJoinGroup();
              }}
              onRenderIcon={() => <Chat20Filled className={videoCameraIconStyle} />}
            />

            {/* <ThemeSelector label="Theme" horizontal={true} /> */}
          </Stack>
        </Stack>
        {/* <Image styles={imageStyleProps} alt="Welcome to the ACS Chat sample app" className={imgStyle} {...imagechatProps} /> */}
      </Stack>
    );
  };

  if (homeScreenState === HOMESCREEN_SHOWING_START_CHAT_BUTTON) {
    return displayHomeScreen();
  } else if (homeScreenState === HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD) {
    return displayLoadingSpinner(spinnerLabel);
  } else {
    throw new Error('home screen state ' + homeScreenState.toString() + ' is invalid');
  }
};
