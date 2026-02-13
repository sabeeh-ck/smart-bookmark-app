"use client";

import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import BottomSheet from "@/components/BottomSheet";
import Header from "@/components/Header";
import { useBookmarks } from "@/hooks/useBookmarks";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();

    const [userId, setUserId] = useState(null);
    const [sheet, setSheet] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const { bookmarks, fetchBookmarks, addBookmark, deleteBookmark, loading } = useBookmarks(userId);

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
        return <p className="text-center mt-20">Checking session...</p>;
    }

    return (
        <>
            <Header />
            <main className="px-4">
                <div className=" inset-x-0 flex justify-between items-center">
                    <h1 className="text-2xl font-medium">My Bookmarks</h1>
                    <button onClick={() => setSheet(true)} className=" bg-text text-bg   rounded-lg py-2 px-8">
                        Add
                    </button>
                </div>

                <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
                {sheet && (
                    <BottomSheet open={sheet} closeSheet={() => setSheet(false)}>
                        <BookmarkForm onAdd={addBookmark} loading={loading} closeSheet={() => setSheet(false)} />
                    </BottomSheet>
                )}
            </main>
        </>
    );
}
