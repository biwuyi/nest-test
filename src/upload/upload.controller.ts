import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// swagger的展示配置
import {
  ApiTags,
  ApiProperty,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

class FilesUploadDto {
  // swagger配置项
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}

// swagger该模块的标题
@ApiTags('文件接口')
// 添加 Bearer token 授权装饰器
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 支持上传多个文件
  @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  // AnyFilesInterceptor定义任意字段的名称
  @UseInterceptors(FilesInterceptor('file')) // file对应HTML表单的name属性
  // swagger入参配置
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择文件',
    type: FilesUploadDto,
  })
  async UploadedFile(@UploadedFiles() files) {
    // 若传入的文件为空，直接返回
    if (!files || files.length === 0) {
      return '未选择文件';
    }
    // 调用service的存储文件方法，传入前端传来的文件数组
    // 成功后会将文件信息返回给前端
    const data = await this.uploadService.create(files);
    return data;
  }
}
