import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenGenerateService } from 'globalServices/token-generate-service/token-generate.service';

@Injectable()
export class TokenGuardGuard implements CanActivate {
  constructor(private token: TokenGenerateService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false
    }
    const [_, token] = request.headers.authorization.split(" ")
    const decoded = this.token.tokenVerify(token);
    request.headers.decodetoken = decoded
    return !!(decoded);
  }
}
