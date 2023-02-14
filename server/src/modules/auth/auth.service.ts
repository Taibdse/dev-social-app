import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  // constructor(private userService: UserService) {}
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
