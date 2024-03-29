import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    // route => /users/me; Protect route with JWT token 
    @Get('me')
    getme(@GetUser() user: User, /*@G*tUser('email') email: string*/) {
        // console.log({email})
        return user
    }

    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto:EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
}
