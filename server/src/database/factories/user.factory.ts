import { User } from 'src/models/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.name = faker.name.fullName();
  user.username = faker.internet.userName(user.name);
  user.email = faker.internet.email(user.name);
  user.password = await bcrypt.hash('123456', 10);
  return user;
})
