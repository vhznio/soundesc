'use client'

import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return <button className={'border rounded-lg p-1 text-white hover:text-green-500'}  onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
    return <button className={'border border-gray-600 rounded-lg p-1 text-indigo-500 hover:text-green-500'} onClick={() => signOut()}>Log Out</button>
}