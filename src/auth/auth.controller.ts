import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../common/public/decorator';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('登录接口')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 注册
  @Public()
  @Post('/signup')
  @ApiBody({
    description: '输入参数',
    type: CreateAuthDto,
  })
  signup(@Body() signupData: CreateAuthDto) {
    return this.authService.signup(signupData);
  }

  // 登录
  @Public()
  @Post('/login')
  @ApiBody({
    description: '输入参数',
    type: CreateAuthDto,
  })
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData);
  }
}
