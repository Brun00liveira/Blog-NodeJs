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
    current: page, // Página atual
    nextPage: hasNextPage ? nextPage : null, // Página seguinte (ou null se não houver próxima)
    currentRoute: '/'
    });
    }catch(error){
        console.log(error)
    }

});
//dashboard
router.get('/dashboard', async (req, res) => {
    try{
        const locals = {
            title: 'Dashboard',
            description: 'Simple Blog created with NodeJs, ExpressJs & MongoDB'
        }
        const data = await Post.find();
        res.render('dashboard', {
            locals,
            data
        })
    }catch(error){
        console.log(error);
    }
})
//add-post(get)
router.get('/add-post', async (req, res) => {
    try {
      const locals = {
        title: 'Add Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('add-post', {
        locals,
        data
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
//add-post(post)
router.post('/add-post', async (req, res) => {
    try {
      try {
        const newPost = new Post({
          title: req.body.title,
          body: req.body.body
        });
  
        await Post.create(newPost);
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });
//edit(get)
router.get('/edit-post/:id', async (req, res) => {
  try {

    const locals = {
      title: "Edit Post",
      description: "Free NodeJs User Management System",
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.render('edit-post', {
      locals,
      data
    })

  } catch (error) {
    console.log(error);
  }

});
//edit(post)
router.put('/edit-post/:id', async (req, res) => {
  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });

    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }

});

//postagem
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
//delete
router.delete('/delete-post/:id', async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
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