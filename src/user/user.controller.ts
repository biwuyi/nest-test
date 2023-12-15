import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('用户接口')
@ApiBearerAuth() // 添加 Bearer token 授权装饰器
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({
    name: 'username',
    example: '靓仔',
    type: 'string',
  })
  @UseInterceptors(ClassSerializerInterceptor) // 响应中隐藏一个字段（password）
  async findAll(@Query() query: any) {
    const users = await this.userService.findAll(query);
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor) // 响应中隐藏一个字段（password）
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.userService.findOne(+id));
  }

  @Patch(':id')
  @ApiBody({
    description: '输入参数',
    type: UpdateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
