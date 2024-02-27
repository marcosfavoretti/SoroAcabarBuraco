# SETUP DO PROJETO

1. Instale o MySQL e execute na porta padrão.
2. Crie duas variáveis de ambiente:
    - user='nomedousuario'
    - pass="senhadobanco"
3. Execute `npm i`.
4. Caso seja a primeira vez que estiver rodando o projeto, vá para `app.module.ts` e defina o valor `synchronize: true`. Após iniciar o servidor, volte esse valor para `false`. Isso criará as tabelas e suas dependências.

**Se estiver usando o processamento de imagem, é necessário um webservice feito em Python. Link do projeto `https://github.com/marcosfavoretti/WebServiceHoleDetector.git`**

## START

Abra um terminal e utilize `npm run start:dev`.

## DOCUMENTAÇÃO

### LOGIN ENDPOINTS

- Criar usuário:
    - Método: POST
    - URL: `http://localhost:3000/login`
    - Parâmetros:
        - name: string;
        - cep: string;
        - password: string;
        - email: string;
        - telefone: string;
        - rua: string;
        - bairro: string;
        - numero: number;

- Autenticar usuário:
    - Método: POST
    - URL: `http://localhost:3000/login/validate`
    - Retorna token
    - Parâmetros:
        - name: string
        - password: string
        - (requer authToken)

- Obter todos os usuários:
    - Método: GET
    - URL: `http://localhost:3000/login`
    - (requer authToken)

### PATOLOGIA ENDPOINTS

- Processar foto de buraco:
    - Método: POST
    - URL: `http://localhost:3000/detectholes/process`
    - Retorna número de buracos e caminho da imagem de saída
    - Parâmetros:
        - x64: string;
        - latitude: number;
        - longitude: number;
        - desc: string;

- Obter o log de um usuário de buracos:
    - Método: GET
    - URL: `http://localhost:3000/detectholes/user`
    - Retorna Patologia[]
    - (requer authToken)

- Obter todos os buracos cadastrados até agora:
    - Método: GET
    - URL: `http://localhost:3000/detectholes`
    - Retorna Patologia[]
