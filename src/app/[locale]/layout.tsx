import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Box from '@mui/material/Box';
import SettingsDropdown from '@/components/SettingsDropdown/SettingsDropdown';
import LanguageSync from '@/components/LanguageSync/LanguageSync';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Ignite Book Browser',
  description: 'Browse Project Gutenberg books',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // Read cookie for theme
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme-mode');
  const initialMode = (themeCookie?.value === 'dark' ? 'dark' : 'light') as 'light' | 'dark';



  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeRegistry initialMode={initialMode}>
            <LanguageSync />
            <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1100 }}>
              <SettingsDropdown />
            </Box>
            {children}
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
