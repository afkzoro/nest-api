import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    
    // route => /users/me; Protect route with JWT token 
    @Get('me')
    getme(@GetUser() user: User, /*@G*tUser('email') email: string*/) {
        // console.log({email})
        return user
    }

    @Patch()
    editUser() {}
}
