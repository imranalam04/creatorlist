"use client"

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";  // Use useRouter for client-side navigation

const HeroForm = ({ user }) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('desiredUsername')) {
            const username = window.localStorage.getItem('desiredUsername');
            window.localStorage.removeItem('desiredUsername');
            router.push('/account?desiredUsername=' + username);  // Client-side redirect
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.querySelector('input');
        const username = input.value;
        if (username.length > 0) {

            // Sign in and redirect after successful authentication
            if (user) {
                redirect('/account?desiredUsername=' + username)
            } else {
                window.localStorage.setItem('desiredUsername', username);

                await signIn('google')
            }
            const result = await signIn('google', {
                redirect: false,  // Don't automatically redirect after sign-in
            });

            if (result?.ok) {
                // Redirect to the account page after successful sign-in
                router.push('/account?username=' + username);
            } else {
                // Handle any sign-in errors here (optional)
                console.error('Sign-in failed:', result?.error);
            }
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20">
                <span className="bg-white py-4 pl-4">
                    creatorlist.to/
                </span>
                <input
                    type="text"
                    className=""
                    style={{ backgroundColor: 'white', marginBottom: 0, paddingLeft: 0 }}
                    placeholder="username" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap">
                    Join for Free
                </button>
            </form>
        </div>
    );
}

export default HeroForm;
