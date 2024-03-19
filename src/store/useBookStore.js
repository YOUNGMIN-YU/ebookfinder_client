import { create } from "zustand";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useBookStore = create((set) => ({
    books: [],
    searchedBooks: [],
    searchKeyword: '',
    sortBy: 'ebookDate',
    elibId: 24,
    bookIsLoading: false,
    hasMore: false,
    actions: {
        addBooks: (data) => set((state) => ({ books: [...state.books, ...data] })),

        addSearchedBooks: (data) => set((state) => ({ searchedBooks: [...state.searchedBooks, ...data] })),

        setSearchKeyword: (val) => set({ searchKeyword: val }),        

        removeAllBooks: () => set({ books: [] }),
    }
}))

export const useBooks = () => useBookStore((state) => state.books);
export const useSearchKeyword = () => useBookStore((state) => state.searchKeyword);
export const useSortBy = () => useBookStore((state) => state.sortBy);
export const useElibId = () => useBookStore((state) => state.elibId);

export const useBookStoreActions = () => useBookStore((state) => state.actions);


const fetchBooks = async (elibId, sortBy, { pageParam })  => {
    const response = await axios.get(`http://localhost:8081/api/elibs/${elibId}/ebooks?page=${pageParam}`, { params: { sort: sortBy}});
    return response.data;
}

const fetchSearchedBooks = async (searchKeyword, sortBy, { pageParam })  => {
    const response = await axios.get('http://localhost:8081/api/ebooks', { 
        params: { keyword: searchKeyword, sort: sortBy, page: pageParam}
    });
    return response.data;
}

export const useAddBooks = () => {
    const elibId = useElibId();
    const sortBy = useSortBy();

    const { data, status, error, fetchNextPage, hasNextPage, } = useInfiniteQuery({
        queryKey: ['books'],
        queryFn: ({ pageParam }) => fetchBooks(elibId, sortBy, { pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const nextPage = allPage.length + 1;
            return lastPage.data.length === 0 ? undefined : nextPage;
        },
        select: (data) => ( console.log("selectedData: ", data), {
            pages: data?.pages.flatMap((page) => page.data),
            pageParams: data.pageParams,
            meta: {
                numFound: data.pages[0].numFound,
            }
          }),
    })

    return { data, status, error, fetchNextPage, hasNextPage };
}

export const useSearchedBooks = () => {
    const searchKeyword = useSearchKeyword();
    const sortBy = useSortBy();

    const { data, status, error, fetchNextPage, hasNextPage, } = useInfiniteQuery({
        queryKey: ['searchedBooks', searchKeyword],
        queryFn: ({ pageParam }) => fetchSearchedBooks(searchKeyword, sortBy, { pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPage) => {
            const nextPage = allPage.length + 1;
            return lastPage.data.length === 0 ? undefined : nextPage;
        },
        select: (data) => (console.log("selectedData of SearchedBooks: ", data), {
            pages: data?.pages.flatMap((page) => page.data),
            pageParams: data.pageParams,
            meta: {
                numFound: data.pages[0].numFound,
                searchKeyword: searchKeyword,
            }
        })
    })

    return { data, status, error, fetchNextPage, hasNextPage, };
}