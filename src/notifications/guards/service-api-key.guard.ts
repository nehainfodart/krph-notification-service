import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class ServiceApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>('SERVICE_API_KEY');
    const request = context.switchToHttp().getRequest();
    const supplied = request.headers['x-service-api-key'];

    if (!expected) {
      throw new ServiceUnavailableException(
        'Service authentication is not configured',
      );
    }

    if (
      typeof supplied !== 'string' ||
      supplied.length !== expected.length
    ) {
      throw new UnauthorizedException('Invalid service API key');
    }

    const valid = timingSafeEqual(
      Buffer.from(supplied),
      Buffer.from(expected),
    );

    if (!valid) {
      throw new UnauthorizedException('Invalid service API key');
    }

    return true;
  }
}