'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import { Book, fetchBooks } from '@/services/api';
import BookCard from '@/components/BookCard/BookCard';
import BookSearch from '@/components/SearchBar/SearchBar';

import { useLocale } from 'next-intl';

interface InfiniteBookListProps {
    topic?: string;
    initialSearch?: string;
}

export default function InfiniteBookList({ topic, initialSearch = '' }: InfiniteBookListProps) {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const [search, setSearch] = React.useState(initialSearch);
    const locale = useLocale();

    // Ref for infinite scrolling
    const { ref, inView } = useInView({
        threshold: 0,
    });

    // Reset list when search, topic, or LOCALE changes
    React.useEffect(() => {
        setBooks([]);
        setPage(1);
        setHasMore(true);
        // Trigger initial fetch
        loadBooks(1, search, true);
    }, [topic, search, locale]);

    // Load more when scrolling to bottom
    React.useEffect(() => {
        if (inView && !loading && hasMore && page > 1) {
            loadBooks(page, search);
        }
    }, [inView, loading, hasMore, page]);

    const loadBooks = async (pageNum: number, searchQuery: string, reset: boolean = false) => {
        setLoading(true);
        try {
            const response = await fetchBooks(topic, searchQuery, pageNum, locale);

            const newBooks = response.results;

            if (reset) {
                setBooks(newBooks);
            } else {
                setBooks(prev => [...prev, ...newBooks]);
            }

            setHasMore(!!response.next);
            if (response.next) {
                setPage(pageNum + 1);
            }
        } catch (error) {
            console.error("Failed to load books", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (newSearch: string) => {
        // Only update if changed to avoid loop
        if (newSearch !== search) {
            setSearch(newSearch);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <BookSearch onSearch={handleSearch} initialValue={initialSearch} />
            </Box>

            <Grid container spacing={3}>
                {books.map((book, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`book-${i}`}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>

            {/* Loading sentinel */}
            <Box ref={ref} sx={{ py: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
                {loading && <CircularProgress />}
                {!loading && books.length === 0 && (
                    <Typography variant="body1" color="text.secondary">No books found</Typography>
                )}
            </Box>
        </Box>
    );
}
