

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Authenticate } from "./authenticate"

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                Email: { label: "Email", type: "text" },
                Password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {
                    const res = await Authenticate(credentials);
                    if (res) {
                        return res;
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn(credentials) { return credentials; },
        async redirect({ _, baseUrl }) {
            return baseUrl;
        },
        async session(session) {
            //session.session           
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/'
    },
    session: { strategy: "jwt", maxAge: 60 * 30, }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }