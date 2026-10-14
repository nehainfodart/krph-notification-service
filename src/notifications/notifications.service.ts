import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto'
import { NOTIFICATION_TEMPLATES } from './notification-templates';
import { SmsProviderService } from './sms-provider.service';
import { WhatsAppProviderService } from './whatsapp-provider.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly smsProvider: SmsProviderService,
    private readonly whatsappProvider: WhatsAppProviderService,
  ) {}

  async sendSms(dto: SendNotificationDto) {
    const template = NOTIFICATION_TEMPLATES[dto.templateID];

    if (!template) {
      throw new BadRequestException('Invalid SMS template');
    }

    const message = template.buildSmsMessage(dto.supportTicketNo);

    return this.smsProvider.sendSms(
      dto.mobileNO,
      message,
      template.smsTemplateId,
    );
  }

  async sendWhatsApp(dto: SendNotificationDto) {
    if (dto.templateID !== 'G' && dto.templateID !== 'R') {
      throw new BadRequestException(
        'WhatsApp is enabled only for template G and R',
      );
    }

    return this.whatsappProvider.sendTemplate(
      dto.mobileNO,
      dto.supportTicketNo,
      dto.templateID,
    );
  }
}