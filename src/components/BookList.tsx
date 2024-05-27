import React from 'react';
import Header from '@/components/Header';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    previewLink?: string; 
  };
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div>
      <Header />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-md bg-white shadow-md">
            <h2 className="text-xl font-bold">
              {book.volumeInfo.previewLink ? (
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {book.volumeInfo.title}
                </a>
              ) : (
                book.volumeInfo.title
              )}
            </h2>
            <p className="text-gray-700">{book.volumeInfo.authors?.join(', ')}</p>
            <p className="text-sm text-gray-500">{book.volumeInfo.description?.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
