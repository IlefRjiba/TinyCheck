/* eslint-disable prettier/prettier */
import {Injectable, OnModuleInit,} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import {CreateUserDto} from "../dto/create-user.dto";
import {Role} from "../enums/role.enum";

const adminUser : CreateUserDto = {email: 'admin@gmail.com', username: 'superAdmin', password: 'admin12', phone: 27028075}


@Injectable()
export class AuthService implements OnModuleInit  {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}
        async onModuleInit() {
            const user = await this.userService.getUserByEmail(adminUser.email)
    
            if (!user) {
                await this.register(adminUser);
                const newUser = await this.userService.getUserByEmail(adminUser.email);
            
                // Effectuer la conversion explicite du type User
                if (newUser instanceof User) {
                  newUser.role = Role.Admin;
                  await this.userService.save(newUser);
                }
              }
        }
    

    
    

    async register (dto: CreateUserDto) {

        const {password, email, username} = dto

        const findUser = await this.userService.getUserByEmail(email)

        if (findUser) {
            throw new Error('User with this email have already registered')
        }

        const salt = await bcrypt.genSaltSync(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await this.userService.createUser({ email, username, phone:0, password: hashedPassword})
        const token = await this.generateToken(newUser)

        return {token: token}

    }
    


    async generateToken (user: User) {

        const payload = {email: user.email, userId: user.id, username: user.username, role: user.role}

        return {
            token: this.jwtService.sign(payload)
        }
    }


    
    
    async checkAuth (userData) {
        const payload = {email: userData.email, userId: userData.userId, username: userData.username, role: userData.role}

        return {
            token: this.jwtService.sign(payload)
        }
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && pass === user.password) {
          // La comparaison directe des mots de passe en clair
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
      
      

      async login(user: any): Promise<{ access_token: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload), // Génère le token JWT
        };
      }

}