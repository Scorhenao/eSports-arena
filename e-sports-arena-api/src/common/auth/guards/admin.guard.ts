import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Get the token from the header

        if (!token) {
            throw new ForbiddenException('Access denied. No token provided.');
        }

        try {
            const decoded: any = this.jwtService.verify(token); // Verify the token
            if (decoded.role !== 'admin') {
                throw new ForbiddenException(
                    'Access denied. You do not have permission to access this resource.',
                );
            }
            return true; // Allow access if the user is an admin
        } catch (error) {
            throw new ForbiddenException('Invalid token.', error);
        }
    }
}
