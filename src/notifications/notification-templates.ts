export type NotificationTemplateId = 'C' | 'I' | 'G' | 'R';

export const NOTIFICATION_TEMPLATES = {
  C: {
    smsTemplateId: '1707165813914061059',
    whatsappEnabled: false,
    buildSmsMessage: (ticketNo: string) =>
      `प्रिय किसान , प्रधानमंत्री फसल बीमा योजना की सहायक सेवा से सम्पर्क करने के लिए आपका धन्यवाद । आपकी शिकायत - ${ticketNo} का समाधान कर दिया गया है । यदि आप संतुष्ट नहीं है तो कृपया 14447 पे कॉल करे । आपका दिन शुभ हो । PMFBY सुरक्षित फसल, निश्चिंत किसान । फसल बीमा है सबका समाधान ॥`,
  },
  I: {
    smsTemplateId: '1707165813910966584',
    whatsappEnabled: false,
    buildSmsMessage: (_ticketNo: string) =>
      'प्रिय किसान , प्रधानमंत्री फसल बीमा योजना की सहायक सेवा से सम्पर्क करने के लिए आपका धन्यवाद । आपका दिन शुभ हो । PMFBY सुरक्षित फसल, निश्चिंत किसान । फसल बीमा है सबका समाधान ॥',
  },
  G: {
    smsTemplateId: '1707165813908017352',
    whatsappTemplateId: '7110953',
    whatsappEnabled: true,
    buildSmsMessage: (ticketNo: string) =>
      `प्रिय किसान , प्रधानमंत्री फसल बीमा योजना की सहायक सेवा से सम्पर्क करने के लिए आपका धन्यवाद । आपके द्वारा दर्ज करायी गयी शिकायत का क्रमांक है - ${ticketNo} "PMFBY सुरक्षित फसल, निश्चिंत किसान । फसल बीमा है सबका समाधान ॥`,
  },
  R: {
    smsTemplateId: '1707165829414696601',
    whatsappTemplateId: '7110980',
    whatsappEnabled: true,
    buildSmsMessage: (ticketNo: string) =>
      `प्रियकिसान , प्रधानमंत्री फसलबीमा योजनाकीसहायकसेवासेसम्पर्ककरनेकेलिएआपकाधन्यवाद। आपकीशिकायत - ${ticketNo} को पुनःजाँचएवंविचारकेलिएभेजदियागयाहै। आपकादिनशुभहो। PMFBY सुरक्षितफसल, निश्चिंतकिसान।फसलबीमाहैसबकासमाधान॥`,
  },
} satisfies Record<
  NotificationTemplateId,
  {
    smsTemplateId: string;
    whatsappTemplateId?: string;
    whatsappEnabled: boolean;
    buildSmsMessage: (ticketNo: string) => string;
  }
>;