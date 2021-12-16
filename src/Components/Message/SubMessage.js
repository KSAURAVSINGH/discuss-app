import React, { useRef, useState ,useContext} from 'react';
import { useMainContext } from '../../Context/Context';
import SubCommentPanel from '../CommentPanel/SubCommentPanel/SubCommentPanel';
const showReply=React.createContext();

export function useOpenReply(){
    return useContext(showReply);
}

function SubMessage(props) {

    const {setMessageUpdate}=useMainContext();

    const likeIcon=useRef();
    const numlikes=useRef();

    const [openReply,setopenReply]=useState(false);

    const changeOpenReply=()=>{
        setopenReply(prevState=>prevState=!prevState);
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
        fetch('/delete-sub-comment',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({messageId:props.parentKey,subId:props.subId})
        }).then(()=>{
            setMessageUpdate([1,props.parentKey]);
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
                    props.user!=="Might Guy" ? (
                        <div onClick={changeOpenReply} 
                        style={{cursor:"pointer"}}>REPLY</div>
                    ):(
                        <div onClick={deleteMessage}
                        style={{cursor:"pointer"}}>DELETE</div>
                    )
                }
            </section>
            <showReply.Provider value={changeOpenReply}>
                {openReply && <SubCommentPanel parentKey={props.parentKey}
                autofocus={true}
            />}
            </showReply.Provider>
            
        </section>
        </>

    );
}

export default SubMessage;