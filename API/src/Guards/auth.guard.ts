
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import GuardService from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public guardService: GuardService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.guardService.ValidateRequest(request);
  }
}
