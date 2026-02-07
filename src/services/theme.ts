import Cookies from 'js-cookie';

import { themes } from '@/config/themeConfig';

export type ThemeMode = keyof typeof themes;

export const THEME_COOKIE_NAME = 'theme-mode';

export function getThemeMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return 'light'; // Default for server if not handled elsewhere
    }
    return (Cookies.get(THEME_COOKIE_NAME) as ThemeMode) || 'light';
}

export function setThemeMode(mode: ThemeMode) {
    Cookies.set(THEME_COOKIE_NAME, mode, { expires: 365 });
}
