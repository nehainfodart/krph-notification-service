import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class KissanSmsProviderService {
 constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async sendKissanSMS(
    mobileNO: string,
    message: string
  ) {
    const url = this.config.get<string>('KISSAN_SERVICE_API_KEY');

 
     if (!url) {
       throw new ServiceUnavailableException(
         'WhatsApp provider configuration is incomplete',
       );
     }
 
     const payload = {
       mobile:mobileNO,
        messageType: 'KRPH',
        smsText:message,
       
     };
 
     try {
       const response = await firstValueFrom(
         this.http.post(url, payload, 
      {
        headers: {
          "Content-Type": "application/json",
          password: '90bbbcde-f07f-11e7-8c3f-9a214cf093ae',
        },
        timeout: 15000,
      }),
       );
 
     
 
       return {
         success: true,
          providerResponse: response.data,
       };
     } catch (error: any) {
       // Never log the API key or return raw Axios request headers.
       throw new ServiceUnavailableException(
      'SMS provider adapter needs the existing SMS API request contract.',
    );
  
     }
   }
 }