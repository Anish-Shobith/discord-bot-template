import { CommandHandler as CommandsHandler } from 'discord-akairo';
import { join } from 'path';
import { TemplateClient } from '../TemplateClient';

export class CommandHandler extends CommandsHandler {
  public constructor(client: TemplateClient) {
    super(client, {
      directory: join(__dirname, '..', '..', '..', '..', 'commands'),
      prefix: [],
      aliasReplacement: /-/g,
      allowMention: true,
      handleEdits: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      defaultCooldown: 3000,
      argumentDefaults: {
        prompt: {
          modifyStart: (_, str): string =>
            `${str}\n\nType \`cancel\` to cancel the command.`,
          modifyRetry: (_, str): string =>
            `${str}\n\nType \`cancel\` to cancel the command.`,
          timeout: 'Guess you took too long, the command has been cancelled.',
          ended:
            "More than 3 tries and you still didn't quite get it. The command has been cancelled",
          cancel: 'The command has been cancelled.',
          retries: 3,
          time: 30000,
        },
        otherwise: '',
      },
    });
  }
}
