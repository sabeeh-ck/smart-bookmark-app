"use client";

import { Bookmark } from "@/types";
import BookmarkCard from "./BookmarkCard";

interface Props {
    bookmarks: Bookmark[];
    loading: boolean;
    onDelete: (id: number) => void;
}

const BookmarksList = ({ bookmarks, loading, onDelete }: Props) => {
    if (loading)
        return (
            <div className="mt-8 flex w-full items-center">
                <p className="text-textmute">Loading your bookmarks...</p>
            </div>
        );

    if (bookmarks.length === 0)
        return (
            <div className="mt-8 flex w-full items-center">
                <p className="text-textmute">No bookmarks yet</p>
            </div>
        );

    return (
        <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((b) => (
                <BookmarkCard key={b.id} {...b} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default BookmarksList;
