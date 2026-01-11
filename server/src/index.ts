import express  from 'express';
 const app = express();

 app.get("/", (req, res)=> {
    res.json({
        message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth"
        endpoint: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        },
    });
 });

 app.listen(3000, () => console.log('Server is up and running on PORT:3000'))