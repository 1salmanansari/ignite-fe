'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSync() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');

        if (storedLanguage && storedLanguage !== locale) {
            // If localStorage has a different language, switch to it
            // We set the cookie to ensure server knows about it for future requests
            document.cookie = `NEXT_LOCALE=${storedLanguage}; path=/; max-age=31536000; SameSite=Lax`;

            // Redirect to the stored language
            router.replace(pathname, { locale: storedLanguage });
            // Force reload to ensure server component re-render with new locale cookie
            router.refresh();
        }
    }, [locale, pathname, router]);

    return null; // This component renders nothing
}
