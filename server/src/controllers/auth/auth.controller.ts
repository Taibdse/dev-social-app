import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { Body, Inject } from '@nestjs/common/decorators';
import { GoogleLoginReqDto } from 'src/dto/user/auth/auth';
import { AuthService } from 'src/modules/auth/auth.service';
import { GoogleAuthGuard } from 'src/modules/auth/gogle-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';

@Controller('auth')
export class AuthController {

  @Inject(AuthService)
  private authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  @Post('/login-google')
  loginGoogle(@Body() googleLoginDto: GoogleLoginReqDto) {
    this.authService.loginGoogle(googleLoginDto.accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/google-init')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }


}
