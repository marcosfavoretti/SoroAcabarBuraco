require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://192.168.100.10:4200', 'http://localhost:4200'], // Corrigido 'htpp' para 'http'
    credentials: true, // Permitir credenciais
  })
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const config = new DocumentBuilder()
  .setTitle('Soroacabar Buracos')
  .setDescription('Documentação da api do soroacabar buracos')
  .setVersion('1.0')
  .addTag('Soroacabar Buracos')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
  'JWT',)
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/doc', app, document);
  await app.listen(3000, process.env.ip).then(() => console.log(`sever running in ${process.env.ip || 'localhost'}`));
}
bootstrap();
