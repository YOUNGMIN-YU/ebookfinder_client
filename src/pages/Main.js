import React from 'react';
import Headroom from 'react-headroom';
import AppHeader from '../components/AppHeader';
import BookList from '../components/BookList';
import { useAddBooks, useSearchedBooks } from '../store/useBookStore';
import { FloatButton } from 'antd';
import styled from 'styled-components'

export default function Main() {
    const { data: booksData, status: booksStatus, error: booksError, fetchNextPage: fetchNextBookPage, hasNextPage: hasMoreBooks } = useAddBooks();
    const { data: searchedBooksData, status: searchedBooksStatus, error: searchedBooksError, fetchNextPage: fetchNextSearchedBookPage, hasNextPage: hasMoreSearchedBooks } = useSearchedBooks();

    return (
        <Layout>
            <HeadroomWrapper>
                <Headroom disableInlineStyles >
                    <AppHeader />
                </Headroom>
            </HeadroomWrapper>

            {
                searchedBooksData?.pages.data ? ( // If searchedBooksData is available, render BookList with searchedBooksData
                    <BookList data={searchedBooksData} fetchNextPage={fetchNextSearchedBookPage} hasNextPage={hasMoreSearchedBooks} />
                ) : ( // Otherwise, render BookList with booksData
                    <BookList data={booksData} fetchNextPage={fetchNextBookPage} hasNextPage={hasMoreBooks} />
                )
            }

            <FloatButton.BackTop shape="circle" tooltip={<div>맨 위로</div>} />
        </Layout>
    );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  position: relative;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style:none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
      display: none; /* Chrome , Safari , Opera */
  }
`

const HeadroomWrapper = styled.div`
.headroom {
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headroom--unfixed {
    position: fixed;
  }
  .headroom--scrolled {
    transition: transform 200ms ease-in-out;
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-37%);
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0%);
  }
`