/* eslint-disable prettier/prettier */
// roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./auth-role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                    context.getHandler(),
                    context.getClass()
                ])

            if (!requiredRoles) return true

            const request = context.switchToHttp().getRequest();

            const authHeader = request.headers

            const bearer = authHeader.authorization.split(' ')[0]
            const token = authHeader.authorization.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User is not authorized'})
            }

            const { ...user} = this.jwtService.verify(token)
            request.user = user

            return requiredRoles.some((role) => user.role?.includes(role));

        } catch (e) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
