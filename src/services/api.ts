export interface Book {
    id: number;
    title: string;
    authors: { name: string; birth_year: number | null; death_year: number | null }[];
    translators: { name: string; birth_year: number | null; death_year: number | null }[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean | null;
    media_type: string;
    formats: { [mimeType: string]: string };
    download_count: number;
}

export interface BookResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Book[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchBooks(topic?: string, search?: string, page: number = 1, languages?: string, mimeType?: string): Promise<BookResponse> {
    const params = new URLSearchParams();

    if (topic) {
        params.set('topic', topic);
    }

    if (search) {
        params.set('search', search);
    }

    if (languages) {
        params.set('languages', languages);
    }

    if (page > 1) {
        params.set('page', page.toString());
    }

    // "API response should only contain the books with covers. (Hint: ONLY query for books that have a mime_type with images)"
    // The hint says "query for books that have a mime_type with images". 
    // Based on Gutendex docs (or common usage), checking for 'image/jpeg' or similar in mime_type filter might be needed, 
    // but usually books have many formats. 
    // The requirements say: "Use this to find books with a given MIME type... starting with the value."
    // And "API response should only contain the books with covers. (Hint: ONLY query for books that have a mime_type with images)"
    // Mime type for images is usually 'image/jpeg' or 'image'. 
    // However, Gutendex `mime_type` filter filters by *available book format*.
    // Books with covers usually have `image/jpeg` format available.
    // So I should add `mime_type=image`.
    params.set('mime_type', 'image');

    const url = `${API_BASE_URL}/books?${params.toString()}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}
