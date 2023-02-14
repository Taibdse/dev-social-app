import { Controller, Get, Inject, Param } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('/all')
  public getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/id/:id')
  public getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }
}
