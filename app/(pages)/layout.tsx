'use client'
import React, { useEffect, useState } from 'react';
import AuthProvider from "@/context/authContext";
import appwriteService from '@/appwrite/config';
import Header from '@/components/Header';
import Blog from '@/components/Blog';
import Loader from '@/components/Loader';

type LayoutProps = {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: LayoutProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                setIsLoading(true);
                const user = await appwriteService.isLoggedInUserAccount();
                if (user) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        checkUser();
    }, []);
    return (<AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
                    <div className="text-primary">
                        <div className="fixed -z-[1] left-1/3 w-12 top-2/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-2/3 w-12 top-1/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-1/4 w-40 top-1/4 blur-2xl opacity-50">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-1/2 w-32 top-1/2 blur-2xl opacity-60">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-[45%] w-12 top-1/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-3/4 w-60 top-1/3 opacity-20 blur-2xl">
                            <Blog blur />
                        </div>
                    </div>
                    <Header />
                    <main className='px-2 py-4'>
                        {
                            isLoading ? <Loader /> : children
                        }
                    </main>

          
    </AuthProvider>
    )
}