"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks?: {
      thumbnail?: string;
    };
    infoLink: string;
  };
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!query) return;
        setLoading(true);
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
          params: {
            q: query,
            key: 'AIzaSyBYufyI6tJaOaih0Qzwk-Px875-k8hn7Yo',
          },
        });
        setBooks(response.data.items || []);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    setBooks([]);
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-4 bg-slate-600 p-6 w-full h-20">
        <div className="flex items-center space-x-8">
          <span className="text-3xl font-bold text-white">Al-Book</span>
        </div>
      </header>
      <form onSubmit={handleSearch} className="flex justify-center mt-8 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Enter book title"
          className="p-2 border rounded-md w-2/3"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md ml-2">
          Search
        </button>
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded-lg ml-2 shadow-md hover:bg-red-700"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">Error fetching books: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg">
            <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img 
                src={book.volumeInfo.imageLinks.thumbnail} 
                alt={book.volumeInfo.title} 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
            <p>{book.volumeInfo.description}</p>
            <a 
              href={book.volumeInfo.infoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-700"
            >
              View Book
            </a>
          </div>
        ))}
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
        made by Muratkhanov Aldiyar
      </footer>
    </div>
  );
};

export default Home;
