import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// interfaces
import { AuthService, MunicipalService } from '../services';

export const AppContext = createContext({});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within the AppProvider');
    }
    return context;
};

const AppProvider = (props: any) => {
    const [user, setUser] = useState<any | null>(null);
    const [palika, setPalika] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState<boolean>(false);

    const getUser = async () => {
        setLoading(true);
        const response = await AuthService.getUser();
        setUser(response);
        setLoading(false);
    };

    const getPalika = async () => {
        setLoading(true);
        const response = await MunicipalService.getMunicipalityData();
        setPalika(response);
        setLoading(false);
    };
    const value = useMemo(
        () => ({
            user,
            setUser,
            getUser,
            setPalika,
            getPalika,
            loading,
            palika,
        }),
        [user, loading, palika, admin]
    );

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
};

export default AppProvider;
