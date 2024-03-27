import React, { useEffect } from 'react'
import { useSearchParams  } from 'react-router-dom';
import { useBookStoreActions, useSearchElibKeyword, useSearchedElibs } from '../store/useBookStore';
import ElibList from '../components/ElibList';

export default function Elibs() {
  const { data: searchedElibsData, status: searchedElibsStatus, isLoading, isFetching, isError } = useSearchedElibs();
  const { setSearchElibKeyword } = useBookStoreActions();
  const searchElibKeyword = useSearchElibKeyword();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('searchElibKeyword') !== null || searchElibKeyword !== '') {
      setSearchElibKeyword(searchParams.get('searchElibKeyword'));
    } else {
      setSearchElibKeyword('');
    }
  }, [])

  useEffect(() => {
    if (searchParams.get('searchElibKeyword') !== null || searchElibKeyword !== '') {
      setSearchElibKeyword(searchParams.get('searchElibKeyword'));
    } else {
      setSearchElibKeyword('');
    }
  }, [searchParams])

  return (
    <div style={{ }}>
      <ElibList data={searchedElibsData} />
    </div>
  )
}
