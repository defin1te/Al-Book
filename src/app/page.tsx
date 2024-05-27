"use client";

import { useState } from 'react';
import BookList from '../components/BookList';
import SearchBar from '@/components/SearchBar';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
  };
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY; 
    if (!apiKey) {
      console.error('API key is not set');
      return;
    }

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      const data = await res.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-1 w-full p-4">
        <SearchBar onSearch={searchBooks} />
        <BookList books={books} />
      </main>
    </div>
  );
};

export default Home;
