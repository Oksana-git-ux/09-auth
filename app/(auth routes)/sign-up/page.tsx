'use client'

import css from './SignUpPage.module.css'
import { register } from '@/lib/api/clientApi'
import { registerRequest } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { useState } from 'react'
import { AxiosError } from 'axios'



const Register = () => {

    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
        setError(null)
        const formValues = Object.fromEntries(formData) as registerRequest
        try {
            const res = await register(formValues)
            if (res) {
                setUser(res)
                router.push('/profile')
            }
        }
        catch (e) {
            const err = e as AxiosError<{ message?: string }>
            setError(err.response?.data?.message ?? 'Something went wrong')
        }


    }

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>

    )
}
export default Register