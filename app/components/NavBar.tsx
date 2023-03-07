"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link"
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import AuthModal from "./AuthModal"

export default function NavBar() {

    const { data, loading } = useContext(AuthenticationContext);
    const { logout } = useAuth();
    return (
        <nav className='bg-white p-2 flex justify-between'>
            <Link href="/" className='font-bold text-gray-700 text-2xl'>OpenTable</Link>
            <div>
                {!loading && <div className='flex'>
                    {data &&
                        <button onClick={logout} className="bg-blue-400 text-white border p-1 px-4 rounded">
                            Log Out
                        </button>}
                    {!data &&
                        <>
                            <AuthModal isSignIn={true} />
                            <AuthModal isSignIn={false} />
                        </>
                    }
                </div>
                }
            </div>
        </nav>
    )
}