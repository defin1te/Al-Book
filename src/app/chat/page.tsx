// src/app/chat/page.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import ChatComponent from '@/components/Chat';
import Header from '@/components/Header';

const ChatPage: React.FC = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <ChatComponent />
    </div>
  );
};

export default ChatPage;
