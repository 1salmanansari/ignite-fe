'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Alert, Snackbar } from '@mui/material';
import { Book } from '@/services/api';

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    const [errorOpen, setErrorOpen] = React.useState(false);

    const handleBookClick = () => {
        const formats = book.formats;
        let url = null;

        // "The app must open the web browser pointing to the book in one of the following formats, 
        // the format higher in the list must be preferred..."
        // HTML > PDF > TXT

        // HTML: 'text/html'
        // PDF: 'application/pdf'
        // TXT: 'text/plain' or 'text/plain; charset=utf-8'

        const htmlFormat = Object.keys(formats).find(k => k.startsWith('text/html'));
        const pdfFormat = Object.keys(formats).find(k => k.startsWith('application/pdf'));
        const txtFormat = Object.keys(formats).find(k => k.startsWith('text/plain'));

        if (htmlFormat) {
            url = formats[htmlFormat];
        } else if (pdfFormat) {
            url = formats[pdfFormat];
        } else if (txtFormat) {
            url = formats[txtFormat];
        }

        if (url) {
            window.open(url, '_blank');
        } else {
            // "If none of the above formats are available, the app must display an alert box..."
            setErrorOpen(true);
        }
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    const coverImage = book.formats['image/jpeg'];
    const authors = book.authors.map(a => a.name).join(', ');

    return (
        <>
            <Card
                sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
                    '&:hover': { transform: 'scale(1.02)' }
                }}
            >
                <CardActionArea onClick={handleBookClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <CardMedia
                        component="img"
                        height="162" // Matching design: "height: 162px"
                        image={coverImage || 'https://via.placeholder.com/114x162?text=No+Cover'}
                        alt={book.title}
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{
                            fontSize: '0.75rem', // 12px
                            fontWeight: 600, // SemiBold
                            textTransform: 'uppercase',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.2,
                            mb: 0.5
                        }}>
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            fontSize: '0.75rem', // 12px
                            color: '#A0A0A0'
                        }}>
                            {authors}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    No viewable version available (HTML, PDF, or TXT).
                </Alert>
            </Snackbar>
        </>
    );
}
