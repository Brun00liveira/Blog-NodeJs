1 - iniciamos com a configuração de postagens , quando clicar na postagem , vou redirecionar para um url post/:id , já que cada post tem seu id no banco

2- cada postagem na pagina index tem uma tag de link , na qual redireciona para a url comentada no passo 1 , assim criei uma rota para acessar o interior da postagem <a href="/post/<%= post._id %>">

3- a rota será um funcão assincrona com 2 parametro data (que é a ação irá realizar, nesse caso a busca pelo Id da popstagem) e locals (que é o titulo e descrição da pagina)

3.1 - criei uma constant slug para acessar o id(let slug = req.params.id;) assim posso assimilar ela no _id         const data = await Post.findById({_id: slug}); , quando for buscar vai retornar para o _id o id da postagem .

3.2 - para finalizar res.render ('post') e no post eu coloquei o title e a descrição do artigo  
