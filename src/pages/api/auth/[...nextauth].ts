import NextAuth from "next-auth";
import { authOptions } from "@flowmoni/server/auth";

export default NextAuth(authOptions);
