import {
  Injectable,
  ServiceUnavailableException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppProviderService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async sendTemplate(
    mobileNO: string,
    supportTicketNo: string,
    templateID: 'G' | 'R',
  ) {
    const url = this.config.get<string>('PINBOT_MESSAGES_URL');
    const apiKey = this.config.get<string>('PINBOT_API_KEY');

    const templateName = this.config.get<string>(
      templateID === 'G' ? 'PINBOT_TEMPLATE_G' : 'PINBOT_TEMPLATE_R',
    );

    if (!url || !apiKey || !templateName) {
      throw new ServiceUnavailableException(
        'WhatsApp provider configuration is incomplete',
      );
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: mobileNO,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'hi',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: supportTicketNo,
              },
            ],
          },
        ],
      },
    };

    try {
      const response = await firstValueFrom(
        this.http.post(url, payload, {
          headers: {
            apikey: apiKey,
            'Content-Type': 'application/json',
          },
          timeout:
            Number(this.config.get('PROVIDER_TIMEOUT_MS')) || 15000,
        }),
      );

      const providerMessageId = response.data?.messages?.[0]?.id;

      return {
        success: true,
        channel: 'whatsapp',
        templateID,
        providerMessageId: providerMessageId ?? null,
        providerResponse: response.data,
      };
    } catch (error: any) {
      // Never log the API key or return raw Axios request headers.
      throw new BadGatewayException({
        message: 'WhatsApp provider request failed',
        providerStatus: error?.response?.status,
      });
    }
  }
}