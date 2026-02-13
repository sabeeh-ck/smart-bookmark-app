import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types";
import { useEffect, useState } from "react";

export const useBookmarks = (userId: string | null) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBookmarks = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("user_id", userId)
            .order("id", { ascending: false });

        if (error) setError(error.message);
        else setBookmarks(data || []);

        setLoading(false);
    };

    useEffect(() => {
        if (!userId) return;

        fetchBookmarks();

        const subscription = supabase
            .channel("bookmark-channel")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                },
                (payload: any) => {
                    if (payload.new?.user_id === userId) fetchBookmarks();
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [userId]);

    const addBookmark = async (title: string, url: string, description: string, tags: string) => {
        if (!userId) return;

        setError(null);

        const formattedTags = (tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const { error } = await supabase.from("bookmarks").insert({
            user_id: userId,
            title,
            url,
            description: description || null,
            tags: formattedTags.length > 0 ? formattedTags : null,
        });

        if (error) {
            setError(error.message);
        } else {
            fetchBookmarks();
        }
    };

    const deleteBookmark = async (id: number) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));

        const { error } = await supabase.from("bookmarks").delete().eq("id", id);

        if (error) fetchBookmarks();
    };

    return { bookmarks, loading, error, fetchBookmarks, addBookmark, deleteBookmark };
};
