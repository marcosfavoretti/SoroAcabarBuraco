import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const sharp = require("sharp")
@Injectable()
export class ImageOperationsService {
    async resize640x640(x64: string) {
        try {
            const buffer = await sharp(Buffer.from(x64, "base64")).resize(640, 640).toBuffer()
            const resizedImg = buffer.toString('base64')
            return resizedImg
        }
        catch (err) {
            throw new HttpException('nao foi possivel redimencionar a img', 500)
        }
    }
}
