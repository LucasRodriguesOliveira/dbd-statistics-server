import { User } from '../entities/user.entity';

export class UserResultDto {
  id: number;
  name: string;
  email: string;
  userType: string;
}

export const UserResultDtoFactory = (user: User): UserResultDto => {
  const { id, name, email, type } = user;

  return {
    id,
    name,
    email,
    userType: type.description,
  };
};
