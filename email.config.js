const email = require('nodemailer')
require('dotenv').config()
const Mailgem = require('mailgen')


const emailContent = new Mailgem({
    theme: 'cerberus',
    product: {
        link: 'https://soroacabarburacos.com',
        name: "Soroacabar Buracos",
        logo: 'http://172.17.117.47:3000/logo.jpeg'
    },
}).generate({
    body: {
        title: "Buraco Cadastrado com sucesso",
        greeting: false,
        signature: false,
        name: "Soroacabar buracos",
        intro: "O cadastro do buraco foi concluido"
    }
})



console.log(process.env.email)
const conn = email.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.email_password
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

conn.sendMail({
    to: 'marcosfavorettijunior@gmail.com',
    from: process.env.email,
    subject: "teste",
    html: emailContent,
})