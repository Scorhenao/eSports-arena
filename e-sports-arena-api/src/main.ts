import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('eSprots API')
        .setDescription(
            'API documentation for player registration and management',
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // This will be accessible at /api

    await app.listen(3000);
}
bootstrap();
