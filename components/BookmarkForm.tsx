"use client";

import { useState } from "react";

type Props = {
    onAdd: (title: string, url: string, description: string, tags: string) => Promise<void>;
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
            <h1 className="text-xl font-bold">Add Bookmark</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
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
                        className="border p-2 rounded"
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
                        className="border p-2 rounded"
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
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <button className="bg-text text-bg mx-auto my-4 rounded-lg px-8 py-2">
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    );
};

export default BookmarkForm;
