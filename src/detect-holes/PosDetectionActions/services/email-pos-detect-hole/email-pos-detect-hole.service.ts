import { Injectable } from '@nestjs/common';
import { ISuccessPosDetect } from '../../ISuccessPosDetect';
import { Patalogia } from 'src/detect-holes/entities/detect-hole.entity';
import { Usuario } from 'src/login/entities/user.entity';
import { NotificationService } from 'globalServices/notification-service/notification-service.service';
import { Email } from 'globalServices/notification-service/email.object';

@Injectable()
export class EmailPosDetectHoleService implements ISuccessPosDetect {
    constructor(private email: NotificationService) { }
    async functionPosDetect(user: Usuario, hole: Patalogia) {
        this.email.notification(new Email(user.email, 'Buraco detectado', `Obrigado por ajudar nossa causa ${user.name}!\nO buraco no endereço rua: ${hole.rua} bairro: ${hole.bairro} foi aprovado.\n
         A prefeitura sera acionada e quando o buraco for corrigido um novo email sera desparado para você, Obigado!\n Att: SoroacabarBuracos❌🕳️😡`)).then(
            () => console.log('email enviado para ', user.name)
        )
    }
}
