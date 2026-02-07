'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/components/ThemeRegistry/theme';
import { ThemeMode, setThemeMode } from '@/services/theme';


interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
    initialMode: ThemeMode;
}

export function ThemeContextProvider({ children, initialMode }: ThemeContextProviderProps) {
    const [mode, setMode] = React.useState<ThemeMode>(initialMode);

    const toggleTheme = React.useCallback(() => {
        setMode((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            setThemeMode(newMode);
            return newMode;
        });
    }, []);

    const setTheme = React.useCallback((newMode: ThemeMode) => {
        setMode(newMode);
        setThemeMode(newMode);
    }, []);

    const theme = React.useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
