"use client";

import { supabase } from "@/lib/supabaseClient";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const Header = () => {
    const path = usePathname();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <header className="bg-bg border-border sticky top-0 z-70 flex h-16 w-full items-center justify-between border-b">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
                <h1 className="text-xl font-medium">MarkIt</h1>
                {path !== "/login" && (
                    <button
                        className="active:bg-border lg:hover:bg-border bg-surface border-border flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
                        onClick={handleLogout}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-5" />
                        <p className="hidden md:block">Logout</p>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
