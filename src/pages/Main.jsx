import React from 'react';
import Loading from '../components/Loading'

export default function Main() {
    const isLoading = false;


    return(
        <> { isLoading ? (
            <Loading />
        ) : (
            <>
            </>
        )}
        </>
    );
}