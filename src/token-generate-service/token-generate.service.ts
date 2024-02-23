import { HttpException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Login } from 'src/login/entities/login.entity';
@Injectable()
export class TokenGenerateService {
    private readonly secretKey = 'senhacomplicada'
    private readonly settings = {
        expiresIn: "1h"
    }

    getToken(user: Login): string {
        return jwt.sign({ ...user }, this.secretKey, this.settings)
    }

    tokenVerify(token: string) {
        try {
            jwt.verify(token, this.secretKey)
            return jwt.decode(token)
        }
        catch {
            throw new HttpException('token invalido', 500)
        }
    }
}
