'use client';
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type User = {
    username: string,
    email: string,
    password: string,
}

const Signup = () => {
    const { setIsLoggedIn } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
    };

    const createUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = await appwriteService.createUserAccount(user);
            console.log({ userData });
            if (userData) {
                setIsLoggedIn(true);
                router.push("/profile");
            }

        } catch (error: any) {
            setError(error.message);
            console.log(error);
        }
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24"> 
            <h1 className="text-center font-bold">Sign up</h1>
            <p className="mt-2 text-center text-base text-gray-600">
                Allready have an account?&nbsp;
                <Link
                    href="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Login
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form className="min-w-[320px] h-fit p-2 md:p-6 border rounded-lg" onSubmit={createUser}>
            <div className="flex flex-col">
                <label htmlFor="username" className="textsm text-slate-600">
                    username
                </label>
                <input type="text" name="username" id="username" value={user.username} onChange={handleChange} className="outline-none border bg-transparent p-2 rounded-lg" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="textsm text-slate-600">
                    email
                </label>
                <input type="text" name="email" id="email" value={user.email} onChange={handleChange} className="outline-none border bg-transparent p-2 rounded-lg" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="textsm text-slate-600">
                    password
                </label>
                <input type="password" name="password" id="password" value={user.password} onChange={handleChange} className="outline-none border bg-transparent p-2 rounded-lg" />
            </div>
            <button className="border bg-pink-600 text-white font-bold p-2 rounded-md mt-8 w-full">Sign up</button>
        </form>
        </div>
    )
}

export default Signup