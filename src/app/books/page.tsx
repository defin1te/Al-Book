// src/app/books/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import BookList from '@/components/BookList';

const BooksPage: React.FC = () => {
  return (
    <div>
      <Header />
      <BookList books={[]} />
    </div>
  );
};

export default BooksPage;
