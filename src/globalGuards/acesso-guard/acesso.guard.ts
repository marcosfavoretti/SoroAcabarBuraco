import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CheckRoleService } from './check-role/check-role.service';
import { method_dicionario } from './method.dicionario';

@Injectable()
export class AcessoGuard implements CanActivate {
  constructor(private role: CheckRoleService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const result = this.role.hasPermission({
      ...request.headers['decodetoken']?.idPerfil
    },
      method_dicionario[request.method]
    ).then(result => {
      if (!result) throw new HttpException('Sem permissão para fazer a ação', 403)
      return result
    })
    return result
  }
}
