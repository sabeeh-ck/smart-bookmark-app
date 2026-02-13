"use client";

import { supabase } from "@/lib/supabaseClient";
import { usePathname } from "next/navigation";

const Header = () => {
    const path = usePathname();

    return (
        <header className="bg-bg sticky border-border flex justify-between z-70  h-16 top-0 border-b items-center mb-4">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
                <h1 className="text-xl font-medium">MarkIt</h1>
                {path !== "/login" && (
                    <button
                        className="active:bg-border md:hover:bg-border border-border flex items-center gap-2 text-sm rounded-lg border py-2 px-4"
                        onClick={async () => await supabase.auth.signOut()}
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
