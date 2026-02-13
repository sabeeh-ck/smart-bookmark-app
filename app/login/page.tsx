"use client";

import Header from "@/components/Header";
import { supabase } from "@/lib/supabaseClient";

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
            <main className="flex flex-col justify-evenly items-center  h-[75vh]">
                <h1 className=" font-bold text-3xl">Welcome to MarkIt</h1>
                <button onClick={handleLogin} className="bg-foreground text-background px-6 py-3 text-sm rounded">
                    Login using Google
                </button>
            </main>
        </>
    );
}
