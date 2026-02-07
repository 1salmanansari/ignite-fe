# Ignite Book Browser Customization Guide

This guide explains how to customize the Ignite Book Browser application, including changing themes, adding languages, and modifying content.

## 1. Customizing the Theme

The application uses a central configuration file for themes:
`src/config/themeConfig.ts`

### Adding a New Theme

To add a new theme, simply add a new entry to the `themes` object in `src/config/themeConfig.ts`:

```typescript
export const themes: Record<string, ThemeConfig> = {
    // ... existing themes
    newTheme: {
        name: 'My New Theme',
        palette: {
            mode: 'light', // or 'dark'
            primary: { main: '#COLOR' },
            background: { default: '#COLOR', paper: '#COLOR' },
            text: { primary: '#COLOR', secondary: '#COLOR' }
        }
    }
};
```

The application will automatically:
1.  Update the `ThemeMode` type definition.
2.  Add the new theme to the **Settings** menu.
3.  Apply the colors when selected.

### Changing Fonts
The font is configured using `next/font` in `theme.ts`:

1.  Import your desired font from `next/font/google`.
2.  Update the `typography` section in the theme creation logic.

## 2. Adding or Modifying Languages

Internationalization is handled by `next-intl`.

### Configuration
Routing and supported locales are defined in `src/i18n/routing.ts`.

To add a new language (e.g., Spanish `es`):
1.  Add `'es'` to the `locales` array in `src/i18n/routing.ts`.
2.  Create a new message file: `messages/es.json`.
3.  Copy the content from `messages/en.json` and translate the values.

### Switching Logic
The language switcher component is located at `src/components/SettingsDropdown/SettingsDropdown.tsx`. It automatically picks up the current locale and handles routing.

## 3. Modifying Genre Categories

The Genre Categories on the Home Page are defined in `src/app/[locale]/page.tsx`.

Look for the `CATEGORIES` constant:

```typescript
const CATEGORIES = [
  { 
    id: 'fiction', 
    title: 'FICTION', 
    icon: <ScienceIcon ... />, 
    href: '/books?topic=Fiction' 
  },
  // ... add or remove categories here
];
```

*   **title**: Display name of the category.
*   **icon**: The MUI icon component to display.
*   **href**: The link destination (usually filtering books by topic).

## 4. UI Components

Key UI components are modular and located in `src/components/`:

*   **BookCard**: `src/components/BookCard/BookCard.tsx` - Displays individual book details.
*   **SearchBar**: `src/components/SearchBar/SearchBar.tsx` - Search input field.
*   **GenreCard**: `src/components/GenreCard/GenreCard.tsx` - Home page category buttons.

## 5. Background Pattern

The background pattern is an SVG file located at `public/pattern.svg`. You can replace this file with any other SVG pattern to change the global background texture.
