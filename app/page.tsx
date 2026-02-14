"use client";

import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import BottomSheet from "@/components/BottomSheet";
import Header from "@/components/Header";
import { useBookmarks } from "@/hooks/useBookmarks";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();

    const [userId, setUserId] = useState<string | null>(null);
    const [sheet, setSheet] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const { bookmarks, fetchBookmarks, addBookmark, deleteBookmark, loading } =
        useBookmarks(userId);

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUserId(user.id);
            setAuthLoading(false);

            console.log("Logged in user:", user.id);
        };

        checkUser();
    }, [router]);

    if (authLoading) {
        return <p className="mt-20 text-center">Checking session...</p>;
    }

    return (
        <>
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-6">
                <div className="inset-x-0 flex items-center justify-between">
                    <h1 className="text-2xl font-medium">My Bookmarks</h1>
                    <button
                        onClick={() => setSheet(true)}
                        className="bg-text text-bg active:bg-text/80 lg:hover:bg-text/80 flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
                    >
                        <PlusIcon className="h-5" />
                        Add
                    </button>
                </div>

                <BookmarkList
                    bookmarks={bookmarks}
                    loading={loading}
                    onDelete={deleteBookmark}
                />

                <BottomSheet open={sheet} closeSheet={() => setSheet(false)}>
                    <BookmarkForm
                        onAdd={addBookmark}
                        loading={loading}
                        closeSheet={() => setSheet(false)}
                    />
                </BottomSheet>
            </main>
        </>
    );
}
