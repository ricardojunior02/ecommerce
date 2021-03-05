interface TemplateVariables {
  [key: string]: string | number;
}

export interface ParseMail {
  file: string;
  variables: TemplateVariables;
}

interface MailContact {
  name: string;
  email: string;
}

export interface DataMail {
  to: MailContact;
  subject: string;
  templateData: ParseMail;
}

export interface SendMail {
  sendMail(data: DataMail ): Promise<void>;
}
