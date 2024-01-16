/* eslint-disable prettier/prettier */
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const request=context.switchToHttp().getRequest();

        try {
            const authHeader = request.headers
            const bearer = authHeader.authorization.split(' ')[0]
            const token = authHeader.authorization.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User is not authorized'})
            }

            const { ...user} = this.jwtService.verify(token)
            request.user = user

            return true

        } catch (e) {
            throw new UnauthorizedException({message: 'User is not authorized.'})
        }
    }
}