import handlebars from 'handlebars';
import { ParseMail } from './dtos/SendMail';
import fs from 'fs';

class HandlebarsTemplate {
  async parse({ file, variables }: ParseMail): Promise<string>{
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default new HandlebarsTemplate();
