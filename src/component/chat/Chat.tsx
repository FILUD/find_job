// Chat.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch messages from server or API
    axios.get('/api/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="chat-container">
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>{message.sender}</strong>: {message.text}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Type your message..." />
      <button>Send</button>
    </div>
  );
};

export default Chat;
