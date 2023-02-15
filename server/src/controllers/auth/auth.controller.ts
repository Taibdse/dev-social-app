import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { AuthService } from 'src/modules/auth/auth.service';
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
    console.log({ req });
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
