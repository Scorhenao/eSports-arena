import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Player Registration API')
        .setDescription(
            'API documentation for player registration and management',
        )
        .setVersion('1.0')
        .addTag('players') // You can add more tags as needed
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // This will be accessible at /api

    await app.listen(3000);
}
bootstrap();
