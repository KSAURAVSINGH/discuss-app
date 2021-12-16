import React, { useEffect, useState } from 'react';
import Message from './Components/Message/Message';
import { useMainContext } from './Context/Context';

function MessageScroll(props) {

const{messageReset,messageUpdate}=useMainContext()

    const [message,setMessage]=useState([]);
    const [showButtonBar,setShowButtonBar]=useState(true);

    useEffect(()=>{
        setShowButtonBar(true);
        console.log("Working ");
        fetch("/get-data",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify()
        }).then(res=>res.json()).then(comments=>{
            setMessage(comments);
        })
    },[messageReset])


    

     useEffect(()=>{
        if(messageUpdate)
        {
            if(messageUpdate[0]===1) 
            {
                fetch('/update-comment',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({commentId:messageUpdate[1]})
                }).then(res=>res.json()).then(commentData=>{
                    updateComment(commentData);
                })
            }
            else if(messageUpdate[0]===2)
            {
                deleteComment();
            }
        }
     },[messageUpdate])

     function updateComment(commentData){
         let currentMessage=[...message];
         console.log("updateComment");
         if(commentData){
             let currentMessageIndex=currentMessage.findIndex(message=>message._id===commentData._id)
             currentMessage.slice(currentMessageIndex,1,commentData);
             setMessage(currentMessage);
         }
     }

     function deleteComment(){
         let currentMessage=[...message];
         let currentMessageIndex=currentMessage.findIndex(message=>message._id===messageUpdate[2]);
         currentMessage.slice(currentMessageIndex,1);
         setMessage(currentMessage);
     }

    return (
        <>
      
        {  
            message.map(message=>(
                <Message key={message._id} useKey={message._id}
                 user={message.user} editable={message.editable}
                 message={message.message} likes={message.likes}
                 replies={message.replies} />
                 
    ))
        }
        {showButtonBar ? <div className="bottomBar">
            <div className="loader">
            </div>
        </div> : null}
         
        </>
    );
}

export default MessageScroll;