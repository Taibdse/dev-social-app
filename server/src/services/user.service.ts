import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }

  createTestUser() {
    const user = new User();
    user.name = 'test';
    user.email = 'test@gmail.com';
    user.location = 'HCM';
    user.username = 'test';
    user.password = 'test';
    return this.userRepository.save(user);
  }
}
