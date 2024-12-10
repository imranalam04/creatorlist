"use client"; // Mark this component as a client-side component

import grabUsername from "@/app/actions/grabUsername.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";

export default function UsernameForm({ desiredUsername }) {
    const [taken, setTaken] = useState(false);
    const router = useRouter(); // Use useRouter for client-side navigation

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const result = await grabUsername(formData);
        setTaken(result === false);
        if (result) {

            router.push('/account?created='+formData.get('username'));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-white text-center mb-2">Grab your username</h1>
            <p className="text-center mb-6 text-gray-200">Choose your username</p>
            <div className="max-w-xs mx-auto mb-2 ">
                <input
                    name="username"
                    defaultValue={desiredUsername}
                    className="block p-2 mx-auto border w-full mb-2 text-center"
                    type="text"
                    placeholder="username"
                />
                {taken && (
                    <div className="bg-red-100 border border-red-500 p-2 text-center">
                        Username Taken
                    </div>
                )}
                <SubmitButton>
                    Claim your username
                </SubmitButton>
            </div>
        </form>
    );
}
