<h1>SETUP DO PROJETO</h1>
<span>1 - instalar o mysql e rodar na porta padrão</span>
<span>2 - criar duas variaveis ambientes (user='nomedousuario', 'pass'="senhadobanco")</span>
<span>3 - npm i</span>
<span>4 - caso for a primeira vez que estiver rodando o projeto va na app.module.ts e deixe o valor synchronize: true. Após de iniciar o servidor volte esse valor para false. Assim ele criara as tabelas e suas dependencias
</span>
<strong>se for usar o processamento de img tem que webservice feito em py</strong>

<h1>START</h1>
<span>abra um terminal e use npm run start:dev</span>

<h1>DOCUMENTAÇAO</h1>
<h2>LOGIN ENDPOINTS<h2>
<span>criar user : POST http://localhost:3000/login 
parametros:  
    name: string;

    cep: string

    password: string;

    email: string;

    telefone: string

    rua: string

    bairro: string

    numero: number

 </span>
<span>auth user : POST http://localhost:3000/login/validate 
=> return token
=> param: 
name: string
password: string
*require authToken</span>
<span>
pegar todos os users : GET http://localhost:3000/login
*require authToken
</span>
<span>
falta: deletar e modificar o usuario
</span>

<h2>PATOLOGIA ENDPOINTS<h2>
<span>
processar foto de buraco : POST http://localhost:3000/detectholes/process
=>return numero de burcos e caminho do output da img
=>parametros : 
    x64: string;

    latitude: number;

    longitude: number;

    desc: string;
</span>

<span>
pegar o log de um usuario de buracos : GET http://localhost:3000/detectholes/user
=>return Patalogia[]
*require authToken
</span>
<span>
pegar todos os buracos até agora cadastrados : GET http://localhost:3000/detectholes
=>return Patalogia[]

</span>