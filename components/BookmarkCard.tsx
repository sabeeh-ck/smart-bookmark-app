"use client";

import { Bookmark } from "@/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props extends Bookmark {
    onDelete: (id: number) => void;
}

const BookmarkCard = ({ id, title, url, inserted_at, description, tags, onDelete }: Props) => {
    const getFavicon = (url: string) => {
        const domain = new URL(url).origin;
        // console.log(`${domain}/favicon.ico`);
        return `${domain}/favicon.ico`;
    };

    const getDomain = (url: string) => {
        return new URL(url).hostname.replace("www.", "");
    };

    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    return (
        <div className="p-4 gap-2 border border-border bg-surface rounded flex flex-col justify-between">
            <div className="flex gap-2  items-start">
                <img src={getFavicon(url)} className="w-5 h-5" alt="favicon" />
                <div className="flex flex-col ">
                    <a href={url} target="_blank" className=" font-semibold ">
                        {title}
                    </a>
                    <p className="text-sm text-textmute">{getDomain(url)}</p>
                </div>
            </div>

            {description && <p className="text-sm line-clamp-2 text-muted-foreground">{description}</p>}

            {tags && (
                <div className="flex gap-2 flex-wrap">
                    {tags?.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                            # {tag}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-xs text-gray-400">{formatDate(inserted_at)}</p>
            <div>
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-800 border rounded-full bg-red-800/20 mt-auto self-start p-2"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="text-text border  rounded-full bg-surface mt-auto self-start p-2"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default BookmarkCard;
