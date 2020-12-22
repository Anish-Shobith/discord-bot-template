import { InhibitorHandler as PreHandler } from 'discord-akairo';
import { join } from 'path';
import { TemplateClient } from '../TemplateClient';

export class InhibitorHandler extends PreHandler {
  public constructor(client: TemplateClient) {
    super(client, {
      directory: join(__dirname, '..', '..', '..', '..', 'inhibitors'),
    });
  }
}
