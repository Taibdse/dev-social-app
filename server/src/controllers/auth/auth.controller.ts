import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { Body, Inject, Req } from '@nestjs/common/decorators';
import { GoogleLoginReqDto, RefreshTokenReqDto, SignUpReqDto } from 'src/dto/auth';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { GoogleAuthGuard } from 'src/modules/auth/guards/google-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { RefreshTokenAuthGuard } from 'src/modules/auth/guards/refresh-token-auth.guard';
import { Request as ExpressReq } from 'express';

@Controller('auth')
export class AuthController {

  @Inject(AuthService)
  private authService: AuthService;

  @Post('/signup')
  signup(@Body() signUpReqDto: SignUpReqDto) {
    return this.authService.signUp(signUpReqDto);
  }

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

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  refreshTokens(@Req() req: ExpressReq & { user: any }) {
    console.log({ reqUser: req.user })
    const userId = req.user['userId'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }


}
