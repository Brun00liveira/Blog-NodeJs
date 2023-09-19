
1° rodar as dependêcias do projeto 

npm install bcrypt 
connect-mongo cookie-parser dotenv ejs expres express-ejs-layouts express-session jsonwebtoken method-override mongoose

com isso já temos tudo para iniciar o projeto

2° criar .gitignore e um .env

3° configurar o package.json para alterar os comandos npm run start e dev

4° criar um servidor e testar no path '/' uma mensagem , para chegar se está rodando (colocar as variaves .env da porta e do host)

5° configuração do layout.ejs e do view engine colocando as path da public, routs e da view

6° criando pastas para organizar o codigo, 
 - public
 - -> js
 - -> css
 - -> img
 - server
 - -> routes
 - - -> main.js

 7° por fim colocar as rotas no arquivo main do route, exportar e receber no app.js 

