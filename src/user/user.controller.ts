import { Controller, Get, UseGuards, Req} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';


@Controller('users')
export class UserController {
    
    // route => /users/me; Protect route with JWT token 
    @UseGuards(JwtGuard)
    @Get('me')
    getme(@Req() req: Request) {
        return req.user
    }
}
