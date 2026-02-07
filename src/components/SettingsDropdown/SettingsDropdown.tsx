'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import { useThemeContext } from '@/context/ThemeContext';
import { useLocale, useTranslations } from 'next-intl';
import { themes } from '@/config/themeConfig';

export default function SettingsDropdown() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { mode, setTheme } = useThemeContext();
    const locale = useLocale();
    const t = useTranslations('Common'); // Assuming we add settings strings here or just use hardcoded for langs

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const handleLanguageChange = (newLocale: string) => {
        // Set cookie for Next.js middleware/SSR
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

        // Set localStorage as requested
        localStorage.setItem('language', newLocale);

        // Refresh the page to apply the new locale via middleware rewrite
        // Using window.location.reload() ensures the new cookie is sent and processed by the server
        window.location.reload();
        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'settings-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="settings-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled sx={{ opacity: '1 !important', color: 'text.primary', fontWeight: 600 }}>
                    <ListItemIcon>
                        {mode === 'dark' || mode === 'negative' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary="Theme" />
                </MenuItem>
                {Object.entries(themes).map(([key, theme]) => (
                    <MenuItem key={key} onClick={(e) => { e.stopPropagation(); setTheme(key as any); }} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            {mode === key && <CheckIcon fontSize="small" />}
                        </ListItemIcon>
                        {theme.name}
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem disabled>
                    <ListItemIcon>
                        <TranslateIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('en')}>
                    <ListItemIcon>
                        {locale === 'en' && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    English
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('fr')}>
                    <ListItemIcon>
                        {locale === 'fr' && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    Français
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
