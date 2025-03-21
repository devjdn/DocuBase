"use client";

import { createContext, SetStateAction, useContext, useMemo, useState } from "react";

export interface SubmissionsContentContext {
    state: "open" | "closed";
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleContent: () => void;
}

const SubmissionsContentContext = createContext<SubmissionsContentContext | undefined>(undefined);

export function useSubmissions() {
    const context = useContext(SubmissionsContentContext);

    if(!context) {
        throw new Error("useSubmissions must be used within a SubmissionsContentProvider");
    }

    return context;
}

export function SubmissionsContentProvider({children}: {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleContent = () => {
        setIsOpen((prev) => !prev);
    }

    const state = isOpen ? "open" : "closed";

    const contextValue = useMemo<SubmissionsContentContext>(() => (
        {isOpen, setIsOpen, state, toggleContent}
    ), [isOpen, setIsOpen, state, toggleContent]);

    return(
        <SubmissionsContentContext.Provider value={contextValue}>
            {children}
        </SubmissionsContentContext.Provider>
    );
}