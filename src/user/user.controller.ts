import { Controller, Get, UseGuards, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('users')
export class UserController {
    
    // route => /users/me; Protect route with JWT token 
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getme(@Req() req: Request) {
        return req.user
    }
}
