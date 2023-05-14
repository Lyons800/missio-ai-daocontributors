    import NextAuth from 'next-auth'
    import Auth02Provider from "next-auth/providers/auth0"
    export default NextAuth({
    providers: [
        Auth02Provider({
        id: 'worldcoin',
        version: '2.0',
        name: 'worldcoin',
        wellKnown: 'https://id.worldcoin.org/.well-known/openid-configuration',
        clientId: "app_staging_004a3007b67001bbf270616ed914ec01",
        clientSecret: "sk_a8f2092943b2a3e48da22905e5e3f0f745a884f6495e3030",
        profile: (profile) => {
            return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            }
        },
        }),
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    });