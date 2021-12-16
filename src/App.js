import React from 'react';
import './App.css';
import TopComment from './Components/CommentPanel/TopComment/TopComment';
import MessageScroll from './MessageScroll';
import { ContextProvider } from './Context/Context';

function App() {
  return (
    <ContextProvider>
      <div className="commentApp">
      <TopComment autoFocus={false}/>
      <MessageScroll />
    </div>
    </ContextProvider>
    
  );
}

export default App;
