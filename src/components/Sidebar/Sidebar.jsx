import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  // Get state and functions from Context
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // Function to load a previous prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
        <div onClick={() => newChat()} className="new_chat">
            <img src={assets.plus_icon} alt="New Chat Icon" />
            {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {/* Map through previous prompts and display them */}
            {prevPrompts.map((item, index) => (
              <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Help Icon" />
            {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="Activity Icon" />
            {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Settings Icon" />
            {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;