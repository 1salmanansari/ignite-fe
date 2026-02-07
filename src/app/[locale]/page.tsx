'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import GenreCard from '@/components/GenreCard/GenreCard';

// Icons matching the design reference
import ScienceIcon from '@mui/icons-material/Science'; // Fiction
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'; // Drama
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Humour
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Politics
import PsychologyIcon from '@mui/icons-material/Psychology'; // Philosophy
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'; // History
import ExploreIcon from '@mui/icons-material/Explore'; // Adventure

const CATEGORIES = [
  { id: 'Fiction', icon: <ScienceIcon color="primary" fontSize="large" />, href: '/books?topic=Fiction' },
  { id: 'Drama', icon: <TheaterComedyIcon color="primary" fontSize="large" />, href: '/books?topic=Drama' },
  { id: 'Humor', icon: <EmojiEmotionsIcon color="primary" fontSize="large" />, href: '/books?topic=Humor' },
  { id: 'Politics', icon: <AccountBalanceIcon color="primary" fontSize="large" />, href: '/books?topic=Politics' },
  { id: 'Philosophy', icon: <PsychologyIcon color="primary" fontSize="large" />, href: '/books?topic=Philosophy' },
  { id: 'History', icon: <HistoryEduIcon color="primary" fontSize="large" />, href: '/books?topic=History' },
  { id: 'Adventure', icon: <ExploreIcon color="primary" fontSize="large" />, href: '/books?topic=Adventure' },
];

export default function Home() {
  const t = useTranslations('HomePage');
  const tCategory = useTranslations('Category');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 8,
        backgroundImage: (theme) => theme.palette.mode === 'light' ? 'url(/pattern.svg)' : 'none', // Only show pattern in light mode
        backgroundSize: 'cover',

      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="h6" color="text.primary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {CATEGORIES.map((category) => (
            <Grid size={{ xs: 12, sm: 6 }} key={category.id}>
              <GenreCard title={tCategory(category.id).toUpperCase()} icon={category.icon} href={category.href} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
