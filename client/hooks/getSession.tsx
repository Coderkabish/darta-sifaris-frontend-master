import { useEffect, useState } from 'react';

export default function useCustomSession() {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        const a = sessionStorage?.getItem('session');
        setSession(a);
    }, []);
    return session;
}
