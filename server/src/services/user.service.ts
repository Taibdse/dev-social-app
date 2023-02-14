import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";

export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }
}
