'use client'

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return <button className={'border rounded-lg p-2 text-white hover:text-green-500'}  onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
    return <button className={'border rounded-lg p-2 text-white hover:text-green-500'} onClick={() => signOut()}>Log Out</button>
}