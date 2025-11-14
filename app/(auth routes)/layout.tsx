// app/(public routes)/layout.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const refreshAndStopLoading = async () => {
            await router.refresh();  // чекаємо завершення
            setLoading(false);       // тепер без каскаду
        };

        refreshAndStopLoading();
    }, [router]);


    return <>{loading ? <div>Loading...</div> : children}</>;
}