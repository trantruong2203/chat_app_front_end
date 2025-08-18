import React from 'react';
import ChatDemo from '../components/ChatDemo';

const ChatDemoPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <ChatDemo />
    </div>
  );
};

export default ChatDemoPage; 