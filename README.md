// Cadastro de usuário

// GET - Listar todos os usuários
// POST - Inserir os usuários
          * name
          * username
          * email
          * password
// PUT - Alterar um usuário pelo ID
// DELETE - Remove um usuario pelo ID

// request.url => Captura a rota

// docker

sudo docker run --name modulo_api_cursos -p 5433:5432 -e POSTGRES_PASSWORD=adminpg -e POSTGRES_USER=admin -d -t postgres

Desenvolverá uma API para realizar o CRUD. A API deve conter as seguintes funcionalidades:

Steps to run this project:

    Run npm i command
    É necessário usar a extensão docker para verificar se o container está rodando

Passos rodar o projeto local

    docker-compose up -d
    npm run dev 

Passos para o projeto local

    CTRL + C
    docker-compose stop
