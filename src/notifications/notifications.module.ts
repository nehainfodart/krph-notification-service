import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SmsProviderService } from './sms-provider.service';
import { WhatsAppProviderService } from './whatsapp-provider.service';
import { ServiceApiKeyGuard } from './guards/service-api-key.guard';

@Module({
  imports: [HttpModule],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    SmsProviderService,
    WhatsAppProviderService,
    ServiceApiKeyGuard,
  ],
})
export class NotificationsModule {}