'use client'

import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    if (!isLoggedIn) {
        router.replace('/login');
        return <></>;
    }


    return (
        <>{children}</>
    )

}