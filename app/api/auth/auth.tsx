"use client"
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export const LoginButotn = () => {
    return <Button onClick={() => '/login'}>Zaloguj</Button>
}

export const LogoutButton = () => {
    return <Button onClick={() => signOut()}>Wyloguj</Button>
}