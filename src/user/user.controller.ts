import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';


@Controller('users')
export class UserController {
    
    // route => /users/me; Protect route with JWT token 
    @UseGuards(JwtGuard)
    @Get('me')
    getme(@GetUser() user: User) {
        return user
    }
}
