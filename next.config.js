/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    env: {
        MONGODB_URL___: "mongodb+srv://lockheart:RAZz8rsNILo88Smq@cluster0.qs9wtoh.mongodb.net/mybook?retryWrites=true&w=majority",
        MONGODB_URL: "mongodb://lockheart:RAZz8rsNILo88Smq@ac-5djtpn4-shard-00-00.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-01.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-02.qs9wtoh.mongodb.net:27017/mybook?ssl=true&replicaSet=atlas-d75adp-shard-0&authSource=admin&retryWrites=true&w=majority",
        HOMEPAGE_URL___: "http://localhost:3000/",
        HOMEPAGE_URL: "nextjs-project-lockhearts-projects.vercel.app",
    },

}

module.exports = nextConfig
