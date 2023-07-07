'use client';
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type User = {
    email: string,
    password: string,
}

const Login = () => {
    const { setIsLoggedIn } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
    };

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = await appwriteService.loginUserAccount(user);
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
            <form className="min-w-[320px] h-fit p-2 md:p-6 border rounded-lg" onSubmit={loginUser}>
                <h1 className="text-center font-bold">Sign up</h1>
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

export default Login