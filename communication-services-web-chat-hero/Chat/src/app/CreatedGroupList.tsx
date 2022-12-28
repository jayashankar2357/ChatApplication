

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
//import {getGroupNames} from './utils/getGroupNames';
export default function CreatedGroupList(props) {
  
//localStorage.setItem('groups',JSON.stringify(['Jay']));
//setTimeout(() => {

//const [groupList, setGroupList] = React.useState<string[]>(props.groupArray.array);
  const onChangetheGroupData = (value)=>
  {     
    props.groupArray.callback(value);
  };
    
  return (
    
       // specifies the tag for render the DropDownList component
       <DropDownListComponent id='ddlelement' dataSource={props.groupArray.array} onChange={(event) => {onChangetheGroupData((event.target as HTMLInputElement).value)}}/>
 
    );
}
