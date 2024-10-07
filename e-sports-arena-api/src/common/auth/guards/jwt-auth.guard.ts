import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided.'); // Change to Unauthorized
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token);
            request.user = decoded; // Attach user info to request
            return true; // Allow access if token is valid
        } catch (error) {
            console.error('Token verification error:', error.message);
            throw new UnauthorizedException('Invalid token.'); // Throw an exception if verification fails
        }
    }
}
