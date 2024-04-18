import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import BookList from '../components/BookList';
import { useElibBooks, useBookStoreActions, useEbookSortBy, useSearchKeyword, useSearchedBooks, useSteps, useTourOpen } from '../store/useBookStore';
import { Row, Spin, Typography } from 'antd';

const { Text } = Typography;

export default function Ebooks() {
    const { data: searchedBooksData, status: searchedBooksStatus, error: searchedBooksError, fetchNextPage: fetchNextSearchedBookPage, hasNextPage: hasMoreSearchedBooks } = useSearchedBooks();
    const { data: elibBooksData, status: elibBooksStatus, error: elibBooksError, fetchNextPage: fetchNextElibBookPage, hasNextPage: hasMoreElibBooks } = useElibBooks();
    const { setSearchKeyword, setElibId } = useBookStoreActions();
    const searchKeyword = useSearchKeyword();
    const [searchParams] = useSearchParams();
    const [isSearched, setIsSearched] = useState(false);
    const [renderData, setRenderData] = useState('searchedBooks');
    const ebookSortBy = useEbookSortBy();


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
            setIsSearched(true);
            setSearchKeyword(searchParams.get('searchEbookKeyword'));
            setRenderData('searchedBooks');
        } else if (searchParams.get('elibNum') !== null) {
            const elibId = searchParams.get('elibNum');
            setIsSearched(true);
            setElibId(elibId);
            setRenderData('elibs');
        } else {
            setSearchKeyword('');
            setIsSearched(false);
        }
    }, [searchParams])

    return (
        <>
            {!isSearched ?
                <Row justify='center' align='middle' style={{ padding: '20px', marginTop: '50px' }}>
                    <Text>검색이 필요해요</Text>
                </Row>
                :
                searchedBooksStatus !== 'success' && elibBooksStatus !== 'success'
                    ? <Spin size='large' fullscreen />
                    :
                    <>
                        <Row justify='space-between' align='middle'
                            style={{
                                display: 'flex',
                                flexDirection: 'rows',
                                width: '100%',
                                maxWidth: '972px'
                            }}
                        >
                            {/* <Col span={18}>
                                <Text>도서관이름</Text>
                            </Col>
                            <Col span={6}>
                                <Select
                                    placeholder='정렬하기'
                                    style={{
                                        marginRight: '0',
                                    }}
                                />
                            </Col> */}
                        </Row>
                        <BookList
                            data={renderData !== 'searchedBooks' ? elibBooksData : searchedBooksData}
                            fetchNextPage={renderData !== 'searchedBooks' ? fetchNextElibBookPage : fetchNextSearchedBookPage}
                            hasNextPage={renderData !== 'searchedBooks' ? hasMoreElibBooks : hasMoreSearchedBooks}
                        />
                    </>
            }
        </>
    )
}
