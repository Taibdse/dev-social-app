import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { SignUpReqDto } from 'src/dto/user/auth/auth';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor() {
    this.googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  private googleAuthClient: OAuth2Client;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private jwtService: JwtService;

  async signUp(signUpReqDto: SignUpReqDto) {
    const isUsernameExisted = await this.userRepository.exist({ where: { username: signUpReqDto.username } });
    if (!isUsernameExisted) {
      const hashedPassword = await bcrypt.hash(signUpReqDto.password, 10);
      const savedUser = { ...signUpReqDto, password: hashedPassword }
      return this.userRepository.save(savedUser);
    } else {
      throw new BadRequestException('Username is already existed!');
    }
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
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginGoogle(idToken: string) {
    console.log({ idToken })
    try {
      const ticket = await this.googleAuthClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,

      });
      const payload = ticket.getPayload();
      console.log({ payload, ticket });
    } catch (error) {
      console.log({ error });
    }
  }
}
