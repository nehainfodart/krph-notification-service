import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { ServiceApiKeyGuard } from './guards/service-api-key.guard';

@Controller('notifications')
@UseGuards(ServiceApiKeyGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Post('sms')
  sendSms(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendSms(dto);
  }

  @Post('whatsapp')
  sendWhatsApp(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendWhatsApp(dto);
  }
}