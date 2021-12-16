import React, { useRef, useState} from 'react';
import '../CommentPanel.css';
import { useMainContext } from '../../../Context/Context';


function TopComment(props) {

    const {setMessageReset}=useMainContext();

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
        
        console.log("event.current.value");
        fetch("/new-comment",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({messageData:message.current.value})
        }).then(()=>{
            setMessageReset(prevState=>!prevState);
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
                    message.current.value="";
                }}>
                CANCEL
               </button>
               </>
           )
            }
        </form>
    
    );
}

export default TopComment;