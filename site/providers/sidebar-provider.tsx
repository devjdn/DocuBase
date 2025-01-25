"use client";

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface SidebarContextProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    sidebarState: 'open' | 'closed';
    sidebarType: 'desktop' | 'mobile';
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if(!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }

    return context;
};

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarType, setSidebarType] = useState<SidebarContextProps['sidebarType']>('desktop');
    const sidebarState: SidebarContextProps['sidebarState'] = isOpen ? 'open' : 'closed';

    const updateSidebarType = useCallback(() => {
        setSidebarType(window.innerWidth >= 768 ? 'desktop' : 'mobile');
    }, [])

    useEffect(() => {
        updateSidebarType();

        const handleWindowResize = () => {
            updateSidebarType();
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }

    }, [updateSidebarType]);

    const toggleSidebar = () => {
        setIsOpen((previousState) => !previousState);
    }

    return(
        <SidebarContext.Provider value={{isOpen, toggleSidebar, sidebarState, sidebarType}}>
            {children}
        </SidebarContext.Provider>
    )
}