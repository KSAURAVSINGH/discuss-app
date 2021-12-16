import React, { useRef, useState ,useContext} from 'react';
import './Message.css';
import CommentPanel from '../CommentPanel/CommentPanel';
import SubMessage from './SubMessage';
import { useMainContext } from '../../Context/Context';


const showReply=React.createContext();

export function useOpenReply(){
    return useContext(showReply);
}

function Message(props) {

    const {setMessageUpdate}=useMainContext();
    const likeIcon=useRef();
    const numlikes=useRef();

    const [arrowUp,setArrowUp]=useState(false);
    const [openReply,setopenReply]=useState(false);

    const changeOpenReply=()=>{
        setopenReply(prevState=>prevState=!prevState);
    }

    let arrow=<i className="fas fa-caret-up"></i>

    const changeArrow=()=>{
        setArrowUp(prevState=>prevState=!prevState);
    }

    if(arrowUp)
    {
        arrow=<i className="fas fa-caret-up"></i>
    }
    else{
        arrow=<i className="fas fa-caret-down"></i>
    }

    let toggleLike=false;
    let likes=props.likes;
    const likeComment=()=>{
        toggleLike=!toggleLike;
        if(toggleLike)
        {
            likes++;
            likeIcon.current.style.color="#4688de";
        }
        else{
            likes--;
            likeIcon.current.style.color="gray";
        }
        numlikes.current.innerHTML=likes;
    }
    const deleteMessage=()=>{
        fetch('/delete-comment',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({messageId:props.useKey})
        }).then(()=>{
            setMessageUpdate([2,props.useKey]);
        })
    }
















    return (
        <>
        <section className="messageContainer"> 
            <div className="messageUser"> 
                {props.user}
            </div>
            <i className="fas fa-user-circle" ></i>
            <div className="messageText">
                {props.message}
            </div>
            <section className="messageIconContainer">
                <i className="fas fa-thumbs-up" ref={likeIcon} onClick={likeComment} ></i>
                <div ref={numlikes}>{props.likes}</div>
                <i className="fas fa-thumbs-down"></i>
                {
                    !props.editable ? (
                        <div onClick={changeOpenReply} 
                        style={{cursor:"pointer"}}>REPLY</div>
                    ):(
                        <div onClick={deleteMessage}
                        style={{cursor:"pointer"}}>DELETE</div>
                    )
                }
            </section>
            <showReply.Provider value={changeOpenReply}>
                {openReply && <CommentPanel useKey={props.useKey}
                autofocus={true}
            />}
            </showReply.Provider>
            {props.replies.length>0 && (<section className="arrowReplies" onClick={changeArrow}>
                <div>{arrow} View {props.replies.length} replies</div>
            </section>)}
            
            {arrowUp && (<section className="subMessage">
                {
                    props.replies.map(reply=>(
                        <SubMessage key={Math.random()} parentKey={props.useKey} subId={reply._id}
                        user={reply.user} message={reply.message} likes={reply.likes} />
                    ))
                }
            </section>)}
        </section>
        </>

    );
}

export default Message;