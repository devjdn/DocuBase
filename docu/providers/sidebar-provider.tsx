"use client";

import * as React from 'react';

type SidebarContextTypes = {
    state: "expanded" | "closed";
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    isOpenMobile: boolean;
    setIsOpenMobile: (openMobile: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
}

const breakpoint = 768;
const kbdShortcut = 'b';

function useMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    mediaQuery.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < breakpoint);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

const SidebarContext = React.createContext<SidebarContextTypes | undefined>(undefined);

export const useSidebar = () => {
    const context = React.useContext(SidebarContext);

    if(!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }

    return context;
};

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
    const isMobile = useMobile();
    const [isOpen, setIsOpen] = React.useState(true);
    const [isOpenMobile, setIsOpenMobile] = React.useState(false);


    const toggleSidebar = React.useCallback(() => {
        return isMobile ? 
        setIsOpenMobile((prev) => !prev) : setIsOpen((prev) => !prev)
    }, [isMobile, setIsOpen, setIsOpenMobile])

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (
            event.key === kbdShortcut &&
            (event.metaKey || event.ctrlKey)
          ) {
            event.preventDefault()
            toggleSidebar()
          }
        }
  
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const state = isOpen ? "expanded" : "closed";

    const contextValue = React.useMemo<SidebarContextTypes>(
        () => ({
          state,
          isOpen,
          setIsOpen,
          isMobile,
          isOpenMobile,
          setIsOpenMobile,
          toggleSidebar,
        }),
        [state, isOpen, setIsOpen, isMobile, isOpenMobile, setIsOpenMobile, toggleSidebar]
      )


    return(
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    )
}