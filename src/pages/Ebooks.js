import React from 'react'
import BookList from '../components/BookList';
import { useSearchedBooks } from '../store/useBookStore';


export default function Ebooks() {
    const { data: searchedBooksData, status: searchedBooksStatus, error: searchedBooksError, fetchNextPage: fetchNextSearchedBookPage, hasNextPage: hasMoreSearchedBooks } = useSearchedBooks();

    return (
        <BookList data={searchedBooksData} fetchNextPage={fetchNextSearchedBookPage} hasNextPage={hasMoreSearchedBooks} />
    )
}
