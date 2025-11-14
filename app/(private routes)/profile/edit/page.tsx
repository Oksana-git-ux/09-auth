'use client'


import { useState, useEffect } from "react"
import { getMe } from "@/lib/api/clientApi"
import css from './EditProfilePage.module.css'
import Image from "next/image"
import { updateMe } from "@/lib/api/clientApi"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"



const EditPage = () => {

    const router = useRouter()

    const setUser = useAuthStore((state) => state.setUser)

    const [userNameValue, setUserNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        getMe().then((user) => {
            setUserNameValue(user.username)
            setEmailValue(user.email)
            setAvatar(user.avatar)
        })
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserNameValue(event.target.value);
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const updated = await updateMe({ username: userNameValue })
            setUser(updated)
            router.push('/profile')


        } catch {

        }
    }
    const handleClose = () => {
        router.push('/profile')
    }


    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                {avatar && <Image src={avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />}


                <form className={css.profileInfo} onSubmit={handleSave}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            value={userNameValue ?? ''}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Email: {emailValue ?? ''}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>

    )
}
export default EditPage