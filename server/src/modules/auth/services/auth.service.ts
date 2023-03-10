import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { SignUpReqDto, Tokens } from 'src/dto/auth';
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
    const googleClientId = configService.get('GOOGLE_CLIENT_ID');
    this.googleAuthClient = new OAuth2Client(googleClientId);
  }

  private googleAuthClient: OAuth2Client;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private jwtService: JwtService;

  // @Inject(ConfigService)
  // configService: ConfigService;

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  getTokens(userId: number, username: string): Tokens {
    const accessTokenSecret = this.configService.get('JWT_ACCESS_SECRET_KEY');
    const refreshTokenSecret = this.configService.get('JWT_REFRESH_SECRET_KEY');
    const accessToken = this.jwtService.sign({ userId, username }, { secret: accessTokenSecret, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ userId, username }, { secret: refreshTokenSecret, expiresIn: '7d' });
    return { accessToken, refreshToken }
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await bcrypt.compare(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens: Tokens = this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async signUp(signUpReqDto: SignUpReqDto) {
    const isUsernameExisted = await this.userRepository.exist({ where: { username: signUpReqDto.username } });
    if (isUsernameExisted) {
      throw new BadRequestException('Username is already existed!');
    }
    const hashedPassword = await this.hashData(signUpReqDto.password);
    const savedUser = { ...signUpReqDto, password: hashedPassword }
    return this.userRepository.save(savedUser);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const { password, ...result } = user;
        return result;
      } else {
        return null
      }
    }
    return null;
  }

  async login(user: any) {
    const tokens = this.getTokens(user.id, user.username);
    this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async loginGoogle(idToken: string) {
    try {
      const ticket = await this.googleAuthClient.verifyIdToken({
        idToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });
      const payload = ticket.getPayload();
      console.log({ payload, ticket });
    } catch (error) {
      console.log({ error });
    }
  }
}
