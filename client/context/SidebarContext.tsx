import React, { createContext, useContext, useMemo, useState } from 'react';

interface SidebarContextValue {
    sidebarIsOpen: boolean;
    setSidebarIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(
    undefined
);

export const useSidebarContext = (): SidebarContextValue => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within the SidebarProvider');
    }
    return context;
};

interface SidebarProviderProps {
    children: React.ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);

    const value = useMemo(
        () => ({
            sidebarIsOpen,
            setSidebarIsOpen,
        }),
        [sidebarIsOpen, setSidebarIsOpen]
    );

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
