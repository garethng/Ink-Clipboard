import { Account, NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DynamoDB } from 'aws-sdk'
import NextAuth from "next-auth";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const dynamoDbClient = new DynamoDB.DocumentClient({
    region: 'your-aws-region',
    accessKeyId: 'your-access-key',
    secretAccessKey: 'your-secret',
  })

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
      },
    pages: {},
    adapter: DynamoDBAdapter(dynamoDbClient, { tableName: 'NextAuth' }),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"username" | "password", string> | undefined) {
                // Add your logic here to find user and verify credentials from DynamoDB
                // Here you can add code to verify user credentials.
                // If credentials are valid you can return a user object. 
                // Let's return a dummy user for demonstration purposes:

                if (credentials && credentials.username === 'user' && credentials.password === 'pass') {
                    return { id: '1', name: 'Demo User' };
                } else {
                    // If user credentials are not valid, return null.
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        
    },
}