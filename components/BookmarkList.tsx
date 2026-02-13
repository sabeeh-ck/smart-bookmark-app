"use client";

import { Bookmark } from "@/types";
import BookmarkCard from "./BookmarkCard";

interface Props {
    bookmarks: Bookmark[];
    onDelete: (id: number) => void;
}

const BookmarksList = ({ bookmarks, onDelete }: Props) => {
    if (bookmarks.length === 0)
        return (
            <div className="w-full mt-8 flex   items-center">
                <p className=" text-textmute">No bookmarks yet</p>
            </div>
        );

    return (
        <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((b) => (
                <BookmarkCard key={b.id} {...b} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default BookmarksList;
