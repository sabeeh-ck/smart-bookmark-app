"use client";

import Header from "@/components/Header";
import { supabase } from "@/lib/supabaseClient";
import { FingerPrintIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) console.log("Login error:", error.message);
    };

    return (
        <>
            <Header />
            <main className="flex h-[75vh] flex-col items-center justify-evenly">
                <h1 className="text-3xl font-bold">Welcome to MarkIt</h1>
                <button
                    onClick={handleLogin}
                    className="bg-text text-bg flex gap-2 rounded-lg px-6 py-3 text-sm"
                >
                    <FingerPrintIcon className="h-5" />
                    Login using Google
                </button>
            </main>
        </>
    );
}
