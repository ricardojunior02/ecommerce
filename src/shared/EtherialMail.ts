import nodemailer, { Transporter } from 'nodemailer';
import handlebars from './handlebars';

import { SendMail, DataMail }from './dtos/SendMail';

export default class EtherealMailProvider implements SendMail  {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: DataMail): Promise<void> {
    const messages = await this.client.sendMail({
      from: {
        name: 'ECOMMERCE',
        address: 'ecommerce@ecommerce.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await handlebars.parse(templateData),
    });
    console.log('Message sent: %s', messages.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(messages));
  }
}
