
import * as React from "react";
import './styles/App.css';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
//import * as ReactDOM from "react-dom";
//export var groupChatName;
export default function GroupChatName(props) {
   // const [groupChatName, setGroupChatName] = React.useState("");
   var groupChatName;
    const onValueGiven = (event) =>  {       
        groupChatName = event.nativeEvent.text;
        props.testCallback(event.nativeEvent.text);
    }

    
    
return (
    // element which is going to render the TextBox
    // <input className="e-input" type="text" placeholder="Enter Name" />
    <div className="App">
    <div className="textboxes">       
        <TextBoxComponent ref = {groupChatName} placeholder="Enter New Group Name" showClearButton={true} floatLabelType="Auto" value={groupChatName} 
        onChange={(event) => onValueGiven(event)}/>
    </div>   
</div>
);
};

//ReactDOM.render(<AppComponent />, document.getElementById('input-container'));