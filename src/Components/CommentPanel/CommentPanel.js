import React, { useContext, useRef, useState } from 'react';
import './CommentPanel.css';
import {useOpenReply} from "../Message/Message";
import { useMainContext } from '../../Context/Context';

function CommentPanel(props) {

    const {setMessageUpdate}=useMainContext();
    const {changeOpenReply}=useOpenReply();
    const message=useRef(null);

    const [showButtons,setShowButtons]=useState(false);

    const [enableBtn,setEnableBtn]=useState(true);

    const commentFocus=()=>{
        setShowButtons(true);
    }
    const commentStroke=event=>{
        let currMessage=event.target.value;
        if(currMessage)
            setEnableBtn(false);
        else
            setEnableBtn(true);
    }

    const sendComment=(event)=>{
        event.preventDefault();
        fetch('/new-sub-comment',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({messageId:props.useKey,messageData:message.current.value})
        }).then(()=>{
            setMessageUpdate([1,props.useKey]);
            message.current.value='';
            setEnableBtn(true);
        })
    }



    return (
       <form>
           <section className="commentBox">
                <input 
                autoFocus={props.autoFocus}
                type="text" 
                placeholder="Join the discussion..."  
                ref={message}
                onFocus={commentFocus}
                onKeyUp={commentStroke}
                />
           </section>
           {showButtons && (
               <>
               <button className="commentButton sendButton" disabled={enableBtn} onClick={sendComment}>COMMENT</button>
               <button className="commentButton" style={{color:"olive"}}
                onClick={()=>{
                    setShowButtons(false);
                    
                }}>
                CANCEL
               </button>
               </>
           )
            }
        </form>
    
    );
}

export default CommentPanel;