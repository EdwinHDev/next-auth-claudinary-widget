import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongodb } from "@/libs";
import { User } from "@/models";
import bcrypt from "bcryptjs";

declare module "next-auth" {

  interface Session {
    user: {
      email: string;
      fullname: string;
      image: string;
      role: string;
    }
  }

}

declare module "next-auth/jwt" {

  interface JWT {
    role: string;
    user: {
      email: string;
      fullname: string;
      image: string;
      role: string;
    }
  }

}

declare module "next-auth" {

  interface User {
    email: string;
    fullname: string;
    image: string;
    role: string;
  }

}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "edwinhernandez@mail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "Escribe tu contraseña" }
      },
      async authorize(credentials, req) {

        await mongodb.connectDB();
        const userFound = await User.findOne({email: credentials?.email}).select("+password");

        if(!userFound) throw new Error("Credenciales incorrectas");
        
        const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);
        
        if(!passwordMatch) throw new Error("Credenciales incorrectas");

        const { email, fullname, image, role } = userFound;

        const user = {
          email,
          fullname,
          image,
          role,
        }

        return JSON.parse(JSON.stringify(user));
      },
    }),
  ],

  callbacks: {
    async jwt({ account, token, user, profile, session }) {
      if(user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as { email: string, fullname: string, image: string, role: string }
      return session;
    }
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
  }
});

export { handler as GET, handler as POST }