1 - fazendo a paginação , iniciei criando as variaveis perPage, page, data , count, next page e hasNextpage

let perPage = num#;
let page = req.query.page || 1;

const data = await Post.aggregate([ {$sort: { createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

Post.aggregate ele recupera os valores do banco e em segui há uma serie de critérios

const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage)

aqui ele realiza a contagem de paginas que há no index 