import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as serveStatic from 'serve-static';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(join(__dirname, '../public/', 'assets'), {
    prefix: '/assets/', //设置静态资源路径
  });
  app.setGlobalPrefix('api');

  // 处理跨域
  app.enableCors();

  // '/static' 是路由名称，即你访问的路径为：host/static
  // serveStatic 为 serve-static 导入的中间件，其中'../static' 为本项目相对于src目录的绝对地址
  app.use(
    '/static',
    serveStatic(join(__dirname, '../../static'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'mp3', 'mp4'], // 可以访问的文件类型
    }),
  );

  // swagger配置
  const options = new DocumentBuilder()
    .setTitle('Nodejs + Vuejs 全栈项目-后台管理API') // 标题
    .setDescription('供后台管理界面调用的服务端API') // 简述
    .setVersion('1.0') // 版本
    .addBearerAuth() // 添加 Bearer token 验证
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none', // 默认不展开
    },
  });
  await app.listen(8800);
}
bootstrap();
