import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('/signUp')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto)
    }
}
