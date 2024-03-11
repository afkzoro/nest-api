import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    
    // route => /users/me; Protect route with JWT token 
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getme() {
        return 'user info';
    }
}
