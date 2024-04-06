const email = require("nodemailer")
export class EMailConnection {
    private conn: any //email connection session

    getConn() {
        return this.conn
    }

    async connect() {
        await this.generateConnection()
        await this.verifyConn()
    }

    async verifyConn() {
        await this.conn.verify(function (error, success) {
            if (error) {
                throw new Error('Serviço de email nao esta instanciado')
            } else {
                console.log('Serviço de email funcionando');
            }
        });

    }

    private async generateConnection() {
        this.conn = await email.createTransport({
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
    }
}