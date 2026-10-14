import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsProviderService {
  constructor(private readonly config: ConfigService) {}

  async sendSms(
    mobileNO: string,
    message: string,
    templateID: string,
  ) {
    const url = this.config.get<string>('SMS_API_URL');

    if (!url) {
      throw new ServiceUnavailableException(
        'SMS provider is not configured. Add SMS_API_URL after the provider contract is confirmed.',
      );
    }

    // Intentionally not sending a request yet:
    // the existing SMS endpoint, HTTP method, headers, and payload
    // have not been supplied. Implement this adapter to match them.

    throw new ServiceUnavailableException(
      'SMS provider adapter needs the existing SMS API request contract.',
    );
  }
}