"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
    onAdd: (
        title: string,
        url: string,
        description: string,
        tags: string,
    ) => Promise<void>;
    loading: boolean;
    closeSheet: () => void;
};

const BookmarkForm = ({ onAdd, loading, closeSheet }: Props) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        if (!title.trim() || !url.trim()) return;

        await onAdd(title, url, description, tags);

        setTitle("");
        setUrl("");
        setDescription("");
        setTags("");
        closeSheet();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">Add Bookmark</h1>
                <button
                    className="active:bg-border md:hover:bg-border bg-surface border-border flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
                    onClick={closeSheet}
                >
                    <XMarkIcon className="h-5" />
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-sm"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">
                        Title <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded border p-2"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="url">
                        URL <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="url"
                        id="url"
                        placeholder="Paste the url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="rounded border p-2"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Short description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="rounded border p-2"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="Add tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="rounded border p-2"
                        required
                    />
                </div>
                <button className="bg-text text-bg active:bg-text/80 lg:hover:bg-text/80 mx-auto flex items-center gap-1 rounded-lg px-4 py-2 text-sm">
                    {loading ? (
                        "Saving..."
                    ) : (
                        <>
                            <CheckIcon className="h-5" />
                            Save
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default BookmarkForm;
