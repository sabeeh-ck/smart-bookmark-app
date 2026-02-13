"use client";

import { ReactNode, useEffect } from "react";

type BottomSheetProps = { closeSheet: () => void; open: boolean; children: ReactNode };

const BottomSheet = ({ closeSheet, open, children }: BottomSheetProps) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <>
            <div key="backdrop" className="fixed inset-0 z-40 bg-black/40" onClick={closeSheet} />

            <div
                key="sheet"
                className="border-border bg-bg fixed inset-x-0 -bottom-10 z-50 min-h-1/2 touch-none rounded-2xl border-t p-4 pb-16 "
            >
                <div className="bg-textmute mx-auto mb-4 h-1.5 w-15 rounded-full" />
                {children}
            </div>
        </>
    );
};

export default BottomSheet;
