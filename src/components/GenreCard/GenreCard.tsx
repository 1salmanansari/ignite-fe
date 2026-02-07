'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from '@/i18n/routing';

interface GenreCardProps {
    title: string;
    icon: React.ReactNode;
    href: string;
}

export default function GenreCard({ title, icon, href }: GenreCardProps) {
    return (
        <Card sx={{
            borderRadius: '4px',
            boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-2px)' }
        }}>
            <CardActionArea component={Link} href={href} sx={{ height: '50px', px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ display: 'flex', mt: '0.5rem', alignItems: 'center', gap: 2 }}>
                        {icon}
                        <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', fontWeight: 500, textTransform: 'uppercase' }}>
                            {title}
                        </Typography>
                    </Box>
                    <ArrowForwardIcon color="primary" />
                </Box>
            </CardActionArea>
        </Card>
    );
}
