import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenGenerateService } from 'src/token-generate-service/token-generate.service';

@Injectable()
export class TokenGuardGuard implements CanActivate {
  constructor(private token: TokenGenerateService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      console.log(request.cookies)
      if (!request.cookies["authToken"]) return false

      const decoded = this.token.tokenVerify(request.cookies["authToken"]);
      request.body.user = decoded; // Adiciona o usuário decodificado ao objeto de solicitação
      console.log(decoded)
      return true;
    } catch (error) {
      return false;
    }

  }
}
