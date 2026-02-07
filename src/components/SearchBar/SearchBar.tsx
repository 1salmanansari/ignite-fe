'use client';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
    initialValue?: string;
    onSearch: (value: string) => void;
}

export default function SearchBar({ initialValue = '', onSearch }: SearchBarProps) {
    const t = useTranslations('Search');
    const [value, setValue] = React.useState(initialValue);

    // Debounce logic
    React.useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(value);
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [value, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <TextField
            fullWidth
            variant="filled" // Use filled variant for background color ease
            placeholder={t('placeholder')}
            value={value}
            onChange={handleChange}
            slotProps={{
                input: {
                    disableUnderline: true, // Remove underline
                    startAdornment: (
                        <InputAdornment position="start" sx={{ height: '100%', display: 'flex', alignItems: 'center', mt: '0 !important', maxHeight: 'none' }}>
                            <SearchIcon sx={{ color: '#A0A0A0' }} />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: 1, // 4px
                        backgroundColor: '#F0F0F6', // Reference design input bg
                        '&.Mui-focused': {
                            backgroundColor: '#F0F0F6', // Keep same on focus
                            border: '1px solid #5E56E7' // Optional focus state
                        },
                        '&:hover': {
                            backgroundColor: '#EAEAEE',
                        },
                        color: '#333'
                    }
                }
            }}
            sx={{
                '& .MuiFilledInput-root': {
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    height: '40px', // Precise height from design
                    display: 'flex',
                    alignItems: 'center',
                },
                '& .MuiFilledInput-input': {
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }
            }}
        />
    );
}
