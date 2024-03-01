import { Injectable } from '@nestjs/common';
import { Patalogia } from 'src/detect-holes/entities/detect-hole.entity';

@Injectable()
export class NotificationServiceService {
    notification(body) {
        // console.log(...body)
        console.log('tombelli faça isso aqui', body.add, body.content)
        return undefined
    }
}
