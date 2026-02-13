export interface Bookmark {
    id: number;
    title: string;
    url: string;
    user_id: string;
    inserted_at: string;
    description: string | null;
    tags: string[] | null;
    image_url: string | null;
    is_favorite: boolean;
}
