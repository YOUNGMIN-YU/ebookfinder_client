import { create } from "zustand";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBookStore = create((set) => ({
    books: [],
    searchedBooks: [],
    searchKeyword: '',
    searchElibKeyword: '',
    elibSortBy: 'elibName',
    ebookSortBy: 'ebookDate',
    elibId: 0,
    tourOpen: false,

    actions: {
        addBooks: (data) => set((state) => ({ books: [...state.books, ...data] })),

        addSearchedBooks: (data) => set((state) => ({ searchedBooks: [...state.searchedBooks, ...data] })),

        setSearchKeyword: (val) => set({ searchKeyword: val }),

        setSearchElibKeyword: (val) => set({ searchElibKeyword: val }),

        setElibId: (val) => set({ elibId: val }),

        removeAllBooks: () => set({ books: [], searchedBooks: [] }),

        setTourOpen: (val) => set({ tourOpen: val }),
    }
}))

export const useBooks = () => useBookStore((state) => state.books);
export const useSearchKeyword = () => useBookStore((state) => state.searchKeyword);
export const useSearchElibKeyword = () => useBookStore((state) => state.searchElibKeyword);
export const useElibSortBy = () => useBookStore((state) => state.elibSortBy);
export const useEbookSortBy = () => useBookStore((state) => state.ebookSortBy);
export const useElibId = () => useBookStore((state) => state.elibId);
export const useTourOpen = () => useBookStore((state) => state.tourOpen);
export const useSteps = () => useBookStore((state) => state.steps);

export const useBookStoreActions = () => useBookStore((state) => state.actions);

const fetchBooks = async (elibId, elibSortBy, { pageParam }) => {
    if (elibId === 0) {
        return; //!꼭 끝내줘야 함/ API통신 전이기에 위로 배치
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/elibs/${elibId}/ebooks?page=${pageParam}`, { params: { sort: elibSortBy } });
    return response.data;
}

const fetchSearchedBooks = async (searchKeyword, elibSortBy, { pageParam }) => {
    if (searchKeyword === '' || searchKeyword === null) {
        return; //!꼭 끝내줘야 함/ API통신 전이기에 위로 배치
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ebooks`, {
        params: { keyword: searchKeyword, sort: elibSortBy, page: pageParam }
    });
    return response.data;
}

const fetchElibs = async (elibName, elibSortBy) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/elibs`, {
        params: { elibName: elibName, sort: elibSortBy }
    });
    return response.data;
}

export const useElibBooks = () => {
    const elibId = useElibId();
    const ebookSortBy = useEbookSortBy();

    const { data, status, error, fetchNextPage, hasNextPage, } = useInfiniteQuery({
        queryKey: ['books', elibId],
        queryFn: ({ pageParam }) => fetchBooks(elibId, ebookSortBy, { pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const nextPage = allPage.length + 1;
            const totalItems = lastPage?.numFound;
            const totalPages = Math.ceil(totalItems / 20);

            return lastPage?.data.length === 0 || totalPages === allPage.length ? undefined : nextPage;
        },
        select: (data) => ({
            pages: data?.pages.flatMap((page) => page.data),
            pageParams: data.pageParams,
            meta: {
                numFound: data?.pages[0].numFound,
            }
        }),
    })

    return { data, status, error, fetchNextPage, hasNextPage };
};

export const useSearchedBooks = () => {
    const searchKeyword = useSearchKeyword();
    const ebookSortBy = useEbookSortBy();

    const { data, status, error, fetchNextPage, hasNextPage, } = useInfiniteQuery({
        queryKey: ['searchedBooks', searchKeyword],
        queryFn: ({ pageParam }) => fetchSearchedBooks(searchKeyword, ebookSortBy, { pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const nextPage = allPage.length + 1;
            const totalItems = lastPage?.numFound;
            const totalPages = Math.ceil(totalItems / 20);

            return lastPage?.data.length === 0 || totalPages === allPage.length ? undefined : nextPage;
        },
        select: (data) => ({
                pages: data?.pages.flatMap((page) => page.data),
                pageParams: data.pageParams,
                meta: {
                    numFound: data?.pages[0].numFound,
                    searchKeyword: searchKeyword,
                }
            })
    });

    return { data, status, error, fetchNextPage, hasNextPage, };
};

export const useSearchedElibs = () => {
    const searchElibKeyword = useSearchElibKeyword();
    const elibSortBy = useElibSortBy();

    const { data, status, isLoading, isFetching, isError } = useQuery({
        queryKey: ['searchedElibs', searchElibKeyword],
        queryFn: ({ queryKey }) => fetchElibs(queryKey[1], elibSortBy),
        select: (data) => ({
            datas: data?.data?.flatMap((data) => data),
            meta: {
                numFound: data?.numFound,
                searchElibKeyword: searchElibKeyword,
            }
        }),
    });

    return { data, status, isLoading, isFetching, isError };
};