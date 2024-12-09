'use client'

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"


const LogoutButton = ({
    className = 'rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600'
}) => {
    return (
        <div>
            <div className="hidden sm:flex">
                <button
                    onClick={() => signOut()}
                    className={className}
                >
                    <LogOut className="inline-flex" />  <span className="mr-2 text-gray-400" />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default LogoutButton