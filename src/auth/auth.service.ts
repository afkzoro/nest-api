import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signup() {
        return { msg: 'This is sign up'}
    }

    signin() {
        return { msg: 'This is a sign in' }
    }
}