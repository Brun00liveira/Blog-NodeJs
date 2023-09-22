const express = require('express');
const router = express.Router();
const Post = require('../models/post')

//routes
router.get('', async (req, res) => {
    try{
        const locals = {
            title: "NodeJS Blog",
            description: "Simple Blog created with NodeJs, ExpressJs & MongoDB"
        }
        //pagination
    let perPage = 5; // Número de postagens por página
    let page = req.query.page || 1; // Página atual (ou 1 se não especificada)
    const message = req.query.message
    // Consulta o banco de dados MongoDB para buscar as postagens
    const data = await Post.aggregate([{$sort: {createdAt: -1}}])
    .skip(perPage * page - perPage) // Pula as postagens das páginas anteriores
    .limit(perPage) // Limita o número de postagens por página
    .exec();

    // Conta o total de postagens no banco de dados
    const count = await Post.count();

    // Calcula a próxima página
    const nextPage = parseInt(page) + 1;

    // Verifica se existe uma próxima página
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // Renderiza a página index.ejs com os dados apropriados
    res.render('index', {
    locals,
    data,
    message,
    current: page, // Página atual
    nextPage: hasNextPage ? nextPage : null, // Página seguinte (ou null se não houver próxima)
    currentRoute: '/'
    });
    }catch(error){
        console.log(error)
    }

});

//search

router.post('/search', async(req, res) => {
    try{
        const locals = {
            title: "Search",
            blog: "Simple Blog created with NodeJs, ExpressJs & MongoDB"
        }
        let searchTerm = req.body.searchTerm;

        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or: [
              { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
              { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
          });
        res.render("search",{
            data,
            locals
        });
        
    }catch(error){
        console.log(error)
    }
})
router.get('/post/:id', async (req, res) => {
    try{
        const locals = {
            title: 'NodeJs Blog',
            description: 'Simple Blog created with NodeJs, ExpressJs & MongoDB'
        }
        let slug = req.params.id;
        const data = await Post.findById({_id: slug});

        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        })
    }catch(error){
        console.log(error);
    }
})
// -> teste para ver se conectou com o banco
// function insertPostData() {
//     Post.insertMany([
//         {
//                   title: "Building APIs with Node.js",
//                   body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//                 },
//                 {
//                   title: "Deployment of Node.js applications",
//                   body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//                 },
//                 {
//                   title: "Authentication and Authorization in Node.js",
//                   body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//                 },
//                 {
//                   title: "Understand how to work with MongoDB and Mongoose",
//                   body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//                 },
//                 {
//                   title: "build real-time, event-driven applications in Node.js",
//                   body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//                 },
//                 {
//                   title: "Discover how to use Express.js",
//                   body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//                 },
//                 {
//                   title: "Asynchronous Programming with Node.js",
//                   body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//                 },
//                 {
//                   title: "Learn the basics of Node.js and its architecture",
//                   body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//                 },
//                 {
//                   title: "NodeJs Limiting Network Traffic",
//                   body: "Learn how to limit netowrk traffic."
//                 },
//                 {
//                   title: "Learn Morgan - HTTP Request logger for NodeJs",
//                   body: "Learn Morgan."
//                 },
//     ])
// }
// insertPostData();
router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;