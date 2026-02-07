import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from '@/i18n/routing';
import InfiniteBookList from '@/components/InfiniteBookList/InfiniteBookList';
import { getTranslations } from 'next-intl/server';

interface BooksPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
    // Await searchParams as per Next.js 15+ / App Router changes (if using latest canary, safer to await or treat as promise in future, 
    // but for stable Next.js 13/14 it's an object. I'll treat it as object for now, or await if it's a promise in the environment).
    // Next 15 requires awaiting searchParams. Let's assume standard behavior.

    const params = await searchParams; // Ensuring we handle it if it is a promise
    const topic = typeof params.topic === 'string' ? params.topic : undefined;
    // const search = typeof params.search === 'string' ? params.search : undefined; // Search is handled by client component state usually, but valid to read from URL too.

    const t = await getTranslations('Category');
    const title = topic ? t(topic) : 'All Books';

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 4 }}>
            <Container maxWidth="md">
                {/* Header */}
                <Box sx={{ py: 3, display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconButton edge="start" aria-label="back">
                            <ArrowBackIcon fontSize="large" color="primary" />
                        </IconButton>
                    </Link>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                        {title}
                    </Typography>
                </Box>

                {/* List Content */}
                <InfiniteBookList topic={topic} />

            </Container>
        </Box>
    );
}
