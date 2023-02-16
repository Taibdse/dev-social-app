import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor() {
    this.googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    console.log({ client: this.googleAuthClient });
  }

  private googleAuthClient: OAuth2Client;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private jwtService: JwtService;

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
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
