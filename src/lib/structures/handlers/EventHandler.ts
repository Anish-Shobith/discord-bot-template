import { ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { TemplateClient } from '../TemplateClient';

export class EventHandler extends ListenerHandler {
  public constructor(client: TemplateClient) {
    super(client, {
      directory: join(__dirname, '..', '..', '..', '..', 'events'),
    });
  }
}
