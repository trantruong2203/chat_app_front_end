import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import './ChatDemo.css';
import dayjs from 'dayjs';

interface Message {
  id: number;
  content: string;
  senderid: number;
  receiverid: number;
  sentat: string;
  status: number;
  messageid: number;
  groupid: number;
}

const ChatDemo: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Kết nối socket
    const newSocket = io('http://localhost:3000', {
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('✅ Đã kết nối với server!');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Đã ngắt kết nối với server!');
      setIsConnected(false);
    });

    newSocket.on('loadMessages', (loadedMessages: Message[]) => {
      console.log('📥 Đã tải tin nhắn:', loadedMessages);
      if (Array.isArray(loadedMessages)) {
        setMessages(loadedMessages.map(msg => ({
          id: msg.id || 0,
          content: msg.content || 'Tin nhắn không hợp lệ',
          senderid: msg.senderid || 0,
          receiverid: msg.receiverid || 0,
          sentat: msg.sentat || dayjs().format('YYYY-MM-DD HH:mm:ss'),
          status: msg.status || 1,
          messageid: msg.messageid || 0,
          groupid: msg.groupid || 0,
        })));
      }
    });

    newSocket.on('receiveMessage', (data: Message) => {
      console.log('📨 Nhận tin nhắn mới:', data);
      const newMessage: Message = {
        id: 0,
        content: data.content || 'Tin nhắn không hợp lệ',
        senderid: data.senderid || 0,
        receiverid: data.receiverid || 0,
        sentat: data.sentat || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        status: data.status || 1,
        messageid: data.messageid || 0,
        groupid: data.groupid || 0,
      };
      setMessages(prev => [...prev, newMessage]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Tự động cuộn xuống tin nhắn mới nhất
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoinChat = () => {
    if (username.trim()) {
      setShowUsernameForm(false);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() && socket && username) {
      const messageData = {
        content: messageInput,
        senderid: username,
        sentat: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        status: 1,
        messageid: 0,
        groupid: 0,
      };
      
      socket.emit('sendMessage', messageData);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (showUsernameForm) {
    return (
      <div className="chat-demo-container">
        <div className="username-form">
          <h2>🎉 Chào mừng đến với Chat Demo!</h2>
          <p>Nhập tên của bạn để bắt đầu chat:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên của bạn..."
            onKeyPress={(e) => e.key === 'Enter' && handleJoinChat()}
          />
          <button onClick={handleJoinChat} disabled={!username.trim()}>
            Tham gia chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-demo-container">
      <div className="chat-header">
        <h2>💬 Chat Demo</h2>
        <div className="connection-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Đã kết nối' : 'Đang kết nối...'}
        </div>
        <div className="user-info">
          👤 {username}
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>📝 Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.senderid === Number(username) ? 'own-message' : 'other-message'}`}
            >
              <div className="message-header">
                <span className="sender">{message.senderid}</span>
                <span className="timestamp">
                  {dayjs(message.sentat).format('HH:mm:ss')}
                </span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập tin nhắn của bạn..."
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!messageInput.trim() || !isConnected}
          className="send-button"
        >
          📤 Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatDemo; 