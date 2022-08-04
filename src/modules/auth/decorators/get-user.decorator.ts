import { createParamDecorator } from '@nestjs/common';
import {
  UserResultDto,
  UserResultDtoFactory,
} from 'src/modules/user/dto/user-result.dto';

export const GetUser = createParamDecorator((data, req): UserResultDto => {
  return UserResultDtoFactory(req.args[0].user);
});
