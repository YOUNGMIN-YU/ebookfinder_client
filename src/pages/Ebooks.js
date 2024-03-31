import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import BookList from '../components/BookList';
import { useAddBooks, useBookStoreActions, useSearchKeyword, useSearchedBooks } from '../store/useBookStore';
import { Spin } from 'antd';


export default function Ebooks() {
    const { data: searchedBooksData, status: searchedBooksStatus, error: searchedBooksError, fetchNextPage: fetchNextSearchedBookPage, hasNextPage: hasMoreSearchedBooks } = useSearchedBooks();
    const { data: elibBooksData, status: elibBooksStatus, error: elibBooksError, fetchNextPage: fetchNextElibBookPage, hasNextPage: hasMoreElibBooks } = useAddBooks();
    const { setSearchKeyword, setElibId } = useBookStoreActions();
    const searchKeyword = useSearchKeyword();
    const [searchParams] = useSearchParams();
    const [isSearched, setIsSearched] = useState(false);
    const [renderData, setRenderData] = useState('searchedBooks');


    useEffect(() => {
        if (searchParams.get('searchEbookKeyword') !== null || searchKeyword !== '') {
            setSearchKeyword(searchParams.get('searchEbookKeyword'));
            setRenderData('searchedBooks');
            setIsSearched(true);
        } else if (searchParams.get('elibNum') !== null) {
            const elibId = searchParams.get('elibNum');
            setElibId(elibId);
            setRenderData('elibs');
            setIsSearched(true);
        } else {
            setSearchKeyword('');
        }

        setIsSearched(true);
    }, [])

    useEffect(() => {
        if (searchKeyword !== '') {
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }
    }, [searchKeyword])

    useEffect(() => {
        if (searchParams.get('searchEbookKeyword') !== null) {
            setSearchKeyword(searchParams.get('searchEbookKeyword'));
            setRenderData('searchedBooks');
            setIsSearched(true);
        } else if (searchParams.get('elibNum') !== null) {
            const elibId = searchParams.get('elibNum');
            setElibId(elibId);
            setRenderData('elibs');
            setIsSearched(true);
        } else {
            setSearchKeyword('');
            setIsSearched(false);
        }
    }, [searchParams])

    return (
        <div style={{}}>
            {!isSearched ?
                <div style={{ textAlign: 'center', marginTop: '30px', }}> 검색 필요 </div> :
                searchedBooksStatus !== 'success' && elibBooksStatus !== 'success'
                    ? <Spin size='large' fullscreen />
                    : <BookList
                        data={renderData !== 'searchedBooks' ? elibBooksData : searchedBooksData}
                        fetchNextPage={renderData !== 'searchedBooks' ? fetchNextElibBookPage : fetchNextSearchedBookPage}
                        hasNextPage={renderData !== 'searchedBooks' ? hasMoreElibBooks : hasMoreSearchedBooks}
                    />}
        </div>
    )
}
