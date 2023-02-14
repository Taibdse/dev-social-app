import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user/user';
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

  @Post()
  public createUser(@Body() user: UserDto) {
    console.log({ user })
    return this.userService.createTestUser();
  }
}
