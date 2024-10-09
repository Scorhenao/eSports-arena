import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        console.log('API Key from headers:', apiKey);
        console.log(
            'Expected API Key:',
            this.configService.get<string>('API_KEY'),
        ); // Log de la API Key esperada

        const validApiKey = this.configService.get<string>('API_KEY');
        if (apiKey === validApiKey) {
            return true; // Clave válida
        } else {
            throw new UnauthorizedException('Invalid API Key');
        }
    }
}
