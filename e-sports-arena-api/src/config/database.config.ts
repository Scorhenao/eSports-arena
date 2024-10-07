import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: process.env.DB_SSL === 'true',
    extra: {
        ssl:
            process.env.DB_SSL === 'true'
                ? { rejectUnauthorized: false }
                : null,
    },
});
