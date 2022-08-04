import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserTokenService } from '../user-token/user-token.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { RegisterDto } from './dto/register.dto';
import { Token } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<boolean> {
    const user: User = await this.userService.create(registerDto);
    const token: Token = await this.userTokenService.createEmailToken(user);

    return true;
  }

  public async checkCredentials({
    email,
    password,
  }: CredentialsDto): Promise<User> {
    const user: User = await this.userService.findByEmail(email);

    if (!user?.isActive) {
      throw new UnauthorizedException('É necessário confirmar o e-mail');
    }

    if (user && (await this.userService.checkPassword(password, user))) {
      return user;
    }

    throw new UnauthorizedException('E-mail ou senha incorretos');
  }
}
