import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// models
import type { User } from './app/lib/models';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// get user based on email 
async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        console.log(user);
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            // use zod to validate the email and password
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                console.log(user);
                if (!user) return null;

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) return user;
            }
            console.log('Invalid credentials.')
            return null;
        },

    }),
    ],
    // adding a callback to retrieve the id 
    callbacks: {
        async session({ session, token }) {
            session.user && (session.user.id = token.sub!)
            return session
        },
    },
});

