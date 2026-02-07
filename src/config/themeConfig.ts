import { PaletteMode, PaletteOptions } from '@mui/material';

export interface ThemeConfig {
    name: string;
    palette: PaletteOptions;
}

export const themes: Record<string, ThemeConfig> = {
    light: {
        name: 'Light',
        palette: {
            mode: 'light',
            primary: {
                main: '#5E56E7',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#F8F7FF',
                paper: '#ffffff',
            },
            text: {
                primary: '#333333',
                secondary: '#A0A0A0',
            }
        }
    },
    dark: {
        name: 'Dark',
        palette: {
            mode: 'dark',
            primary: {
                main: '#5E56E7',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#121212',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ededed',
                secondary: '#a0a0a0',
            }
        }
    },
    negative: {
        name: 'Negative',
        palette: {
            mode: 'dark', // Uses dark base components
            primary: {
                main: '#A1A918',
            },
            secondary: {
                main: '#f50057',
            },
            background: {
                default: '#070800',
                paper: '#000000',
            },
            text: {
                primary: '#CCCCCC',
                secondary: '#5F5F5F',
            }
        }
    }
};
