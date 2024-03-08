import { Injectable, OnModuleInit } from '@nestjs/common';
import { Patalogia } from 'src/detect-holes/entities/detect-hole.entity';
import { EMailConnection } from './email.connection';
import { Email } from './email.object';
const email = require('nodemailer')
@Injectable()
export class NotificationService implements OnModuleInit {
    private email_connection: EMailConnection

    async notification(email: Email) {
        await this.email_connection.getConn().sendMail(email) //esse metodo é assincrono mas eu nao vou esperar o envio para ficar mais rapido as respostas
    }

    async onModuleInit() {
        this.email_connection = new EMailConnection()
        this.email_connection.connect() //faz a classe de conexao fazer a conexao  
    }
}
