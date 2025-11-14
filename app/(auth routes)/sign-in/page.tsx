'use client'


import { registerRequest } from '@/lib/api/clientApi'
import css from './SignInPage.module.css'
import { login } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthStore } from '@/lib/store/authStore'


const Login = () => {
    const setUser = useAuthStore((state) => state.setUser)

    const router = useRouter()
    const [error, setError] = useState('')


    const handleSubmit = async (formData: FormData) => {
        try {
            const formValue = Object.fromEntries(formData) as registerRequest
            const res = await login(formValue)
            if (res) {
                setUser(res)
                router.push('/profile')
            }
        } catch {
            setError(
                'Oops... some error'
            )
        }

    }

    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>

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
                        Log in
                    </button>
                </div>

                <p className={css.error}>{error}</p>
            </form>
        </main>

    )
}
export default Login