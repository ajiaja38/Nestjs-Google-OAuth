import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERole } from 'src/types/enum/ERole.enum';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: ERole[] = this.reflector.get<ERole[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) throw new ForbiddenException('You do not have permission');

    const request = context.switchToHttp().getRequest();
    const user: IJwtPayload = request.user;

    if (!this.matchRoles(roles, user.role)) {
      throw new Error('You do not have permission to access this resource');
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(allowedRoles: ERole[], userRole: ERole) {
    return allowedRoles.includes(userRole);
  }
}
