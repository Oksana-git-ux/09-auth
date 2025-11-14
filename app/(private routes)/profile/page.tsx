

import Link from 'next/link'
import css from './ProfilePage.module.css'
import { getServerMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Profile",
    description: "Change your profile",
    openGraph: {
        title: "Profile",
        description: "Change your profile",
        url: 'https://09-auth-nine-jet.vercel.app/',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "Profile"
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Profile",
        description: "Change your profile",
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
};


const ProfilePage = async () => {
    const res = await getServerMe()



    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <div className={css.header}>
                        <h1 className={css.formTitle}>Profile Page</h1>
                        <Link href="/profile/edit" className={css.editProfileButton}>
                            Edit Profile
                        </Link>
                    </div>
                    <div className={css.avatarWrapper}>
                        {res.avatar && <Image
                            src={res.avatar}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className={css.avatar}
                        />}
                    </div>
                    <div className={css.profileInfo}>
                        <p>

                            Username: {res.username}
                        </p>
                        <p>
                            Email: {res.email}
                        </p>
                    </div>
                </div>
            </main>

        </>
    )
}
export default ProfilePage