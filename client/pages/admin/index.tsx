import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function indexPage() {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin/dashboard');
    }, []);

    return (
        <>Hello World</>
    );
}
