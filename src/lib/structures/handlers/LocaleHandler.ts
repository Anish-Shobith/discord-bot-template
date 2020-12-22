import {
  AkairoClient,
  AkairoHandler,
  AkairoHandlerOptions,
} from 'discord-akairo';
import { Collection } from 'discord.js';
import { join } from 'path';
import { Locale } from '../Locale';

/**
 * Handles Locale classes.
 * @param client Client to attach to
 * @param options Options for the handler
 */
export class LocaleHandler extends AkairoHandler {
  public modules!: Collection<string, Locale>;

  public constructor(client: AkairoClient) {
    super(client, {
      directory: join(__dirname, '..', '..', '..', '..', 'locale'),
      classToHandle: Locale,
    });
  }

  /**
   * Checks if a locale exists and is loaded.
   * @param id ID of the locale to search
   */
  public has(id: string): boolean {
    return this.modules.has(id);
  }

  /**
   * Finds a locale based on its ID.
   * @param id ID of the locale
   */
  public get(id: string): Locale {
    const locale = this.modules.get(id);
    if (locale) return locale;
    throw new Error(`Invalid locale: '${id}'`);
  }
}
