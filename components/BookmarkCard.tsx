"use client";

import { Bookmark } from "@/types";
import {
    ArrowUpRightIcon,
    PaperClipIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

interface Props extends Bookmark {
    onDelete: (id: number) => void;
}

const BookmarkCard = ({
    id,
    title,
    url,
    inserted_at,
    description,
    tags,
    onDelete,
}: Props) => {
    const getFavicon = (url: string) => {
        const domain = new URL(url).origin;
        return `${domain}/favicon.ico`;
    };

    const getDomain = (url: string) => {
        return new URL(url).hostname.replace("www.", "");
    };

    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
        } else {
            alert("Clipboard not supported");
        }
    };

    const actionButtons = [
        {
            name: "Copy Link",
            icon: <PaperClipIcon className="h-4 w-4" />,
            action: handleCopy,
        },
        // {
        //   name: "Edit",
        //   icon: <PencilSquareIcon className="h-4 w-4" />,
        //   action: "",
        // },
        {
            name: "Delete",
            icon: <TrashIcon className="h-4 w-4" />,
            action: () => onDelete(id),
        },
    ];

    return (
        <div className="border-border bg-surface flex flex-col justify-between gap-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
                <img
                    src={getFavicon(url)}
                    className="w-8"
                    alt="favicon"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/globe.svg";
                    }}
                />
                <div className="flex flex-col">
                    <a
                        href={url}
                        target="_blank"
                        className="decoration-textmute flex items-center font-semibold underline decoration-dotted underline-offset-3 active:decoration-solid lg:hover:decoration-solid"
                    >
                        {title}
                        <ArrowUpRightIcon className="h-4" />
                    </a>
                    <p className="text-textmute text-sm">{getDomain(url)}</p>
                </div>
            </div>

            {description && (
                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {description}
                </p>
            )}

            {tags && (
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span
                            key={tag}
                            className="bg-border rounded-full px-2 py-1 text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between gap-2">
                <p className="text-textmute mr-auto text-xs">
                    {formatDate(inserted_at)}
                </p>

                {actionButtons.map(({ name, icon, action }) => (
                    <Fragment key={name}>
                        {name === "Copy Link" && (
                            <span
                                className={`text-textmute bg-border overflow-hidden rounded-full text-xs whitespace-nowrap transition-all duration-300 ease-in-out ${
                                    copied
                                        ? "max-w-xs px-2 py-1 opacity-100"
                                        : "max-w-0 px-0 py-1 opacity-0"
                                }`}
                            >
                                Link Copied
                            </span>
                        )}
                        <button
                            onClick={action}
                            className={`border-border bg-surface active:bg-border lg:hover:bg-border mt-auto self-start rounded-full border p-2 ${name === "Delete" ? "text-delete" : "text-text"}`}
                        >
                            {icon}
                        </button>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default BookmarkCard;
