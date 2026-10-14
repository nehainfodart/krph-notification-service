import {
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @IsIn(['C', 'I', 'G', 'R'])
  templateID: 'C' | 'I' | 'G' | 'R';

  @IsString()
  @Matches(/^\d{10,15}$/, {
    message: 'mobileNO must contain 10 to 15 digits, including country code if required',
  })
  mobileNO: string;

  @IsString()
  @IsNotEmpty()
  supportTicketNo: string;
}