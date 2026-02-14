"use client";

import { supabase } from "@/lib/supabaseClient";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

type HeaderProps = {
    user?: null | User;
};

const Header = ({ user }: HeaderProps) => {
    const path = usePathname();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const { name, avatar_url } = user?.user_metadata || {};

    return (
        <header className="bg-bg border-border sticky top-0 z-70 flex h-16 w-full items-center justify-between border-b">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
                <h1 className="mr-auto text-xl font-medium">MarkIt</h1>
                {path !== "/login" && (
                    <>
                        <div className="bg-surface flex items-center gap-2 rounded-full p-2 text-sm">
                            <p className="hidden pl-2 md:block">Logged in as</p>
                            <p className="pl-2 font-bold md:p-0">
                                {name.split(" ")[0]}
                            </p>
                            <img
                                className="w-6 rounded-full"
                                src={avatar_url}
                                alt={name}
                            />
                        </div>

                        <button
                            className="active:bg-border lg:hover:bg-border bg-surface border-border flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
                            onClick={handleLogout}
                        >
                            <ArrowLeftStartOnRectangleIcon className="h-5" />
                            <p className="hidden md:block">Logout</p>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
