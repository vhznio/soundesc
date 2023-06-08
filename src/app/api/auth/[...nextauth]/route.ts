import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import prisma from "../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" } 
            },
            async authorize(credentials, ) {
                const { email, password }:any = credentials;

                const result = await prisma.user.findUnique({
                    where: {
                      email
                    }
                })

                if(!result){
                    throw new Error("No user found")
                }
                const checkPassword = await bcrypt.compare(password, result.password as any)             
                if(!checkPassword || email !== result.email){
                    const error = new Error("Email or password doesn't match")
                    throw error
                }
                return result
            }
        })
    ],
    session: {
        strategy:'jwt'
    },
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async session({ session, token }) {
            session.user.uid = token.sub
            session.user.name = token.name
            session.user.email = token.email
            return session;
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
