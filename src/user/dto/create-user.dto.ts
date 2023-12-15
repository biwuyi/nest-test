import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // swagger配置项
  @ApiProperty({ default: '用户名' })
  username: string;

  @ApiProperty({ default: '密码' })
  password: string;
}
