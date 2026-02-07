import { Montserrat } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ThemeMode } from '@/services/theme';

const montserrat = Montserrat({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

import { themes } from '@/config/themeConfig';

export const getTheme = (mode: ThemeMode) => {
    const themeConfig = themes[mode] || themes['light']; // Fallback to light
    const palette = themeConfig.palette;

    return createTheme({
        palette: {
            mode: palette.mode,
            primary: palette.primary,
            secondary: palette.secondary,
            background: palette.background,
            text: palette.text
        },
        typography: {
            fontFamily: montserrat.style.fontFamily,
            h1: {
                fontSize: '3rem', // 48px
                fontWeight: 600, // SemiBold
                color: (palette.primary as any)?.main || '#5E56E7', // Dynamic Primary with fallback
            },
            h2: {
                fontSize: '1.875rem', // 30px
                fontWeight: 600, // SemiBold
            },
            body1: {
                fontSize: '1rem', // 16px
                fontWeight: 400, // Regular
            },
            caption: {
                fontSize: '0.75rem', // 12px
                fontWeight: 400,
            }
        },
        components: {
            MuiAlert: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...(ownerState.severity === 'info' && {
                            backgroundColor: '#60a5fa',
                        }),
                    }),
                },
            },
        },
    });
};

export default getTheme('light'); // Default export for backwards compatibility if needed

