"use client";

import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { ChangeEvent, FormEvent, useState } from "react"

type User = {
  username: string,
  email: string,
  password: string,
}

export default function Home() {
  const data = useAuth();
  console.log({ data });
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await appwriteService.createUserAccount({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     
    </main>
  )
}
