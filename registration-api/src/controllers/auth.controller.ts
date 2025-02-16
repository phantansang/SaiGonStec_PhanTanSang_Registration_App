import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    return this.authService.register(
      body.fullName,
      body.email,
      body.password,
      body.phoneNumber,
    );
  }

  @Post('verify-email')
  async verifyEmail(@Body() body) {
    return this.authService.verifyEmail(body.email, body.code);
  }
}
