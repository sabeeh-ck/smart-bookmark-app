"use client";

import { ReactNode, useEffect } from "react";

type BottomSheetProps = {
    closeSheet: () => void;
    open: boolean;
    children: ReactNode;
};

const BottomSheet = ({ closeSheet, open, children }: BottomSheetProps) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <>
            <div
                key="backdrop"
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={closeSheet}
            />

            <div
                key="sheet"
                role="dialog"
                aria-modal="true"
                className={`bg-bg border-border fixed inset-x-0 bottom-0 z-50 min-h-1/2 transform rounded-t-2xl border-t p-4 pb-6 transition-all duration-300 ease-in-out md:inset-0 md:m-auto md:h-fit md:w-2/3 md:max-w-3xl md:transform md:rounded-xl md:border ${
                    open
                        ? "pointer-events-auto translate-y-0 opacity-100 md:translate-none md:scale-100"
                        : "pointer-events-none translate-y-full opacity-0 md:translate-none md:scale-95"
                } `}
            >
                {children}
            </div>
        </>
    );
};

export default BottomSheet;
