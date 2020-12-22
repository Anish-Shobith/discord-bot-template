import { AkairoClient, AkairoHandler, AkairoOptions } from 'discord-akairo';
import {
  Application,
  ClientOptions,
  Collection,
  Message,
  Permissions,
  PermissionResolvable,
} from 'discord.js';
import {
  CommandHandler,
  EventHandler,
  InhibitorHandler,
  LocaleHandler,
} from './handlers';

import type { ArrayLike } from '../types/ArrayLike';

export class TemplateClient extends AkairoClient {
  public config: TemplateClientOptions;
  public commands: CommandHandler;
  public events: EventHandler;
  public inhibitors: InhibitorHandler;
  public locales: LocaleHandler;

  public application?: Application | null;

  public handlers: Collection<string, AkairoHandler>;

  public constructor(options: TemplateClientOptions) {
    super(options);
    this.config = options;
    this.commands = new CommandHandler(this);
    this.events = new EventHandler(this);
    this.inhibitors = new InhibitorHandler(this);
    this.locales = new LocaleHandler(this);

    this.handlers = new Collection();

    this.registerHandler(this.commands)
      .registerHandler(this.events)
      .registerHandler(this.locales)
      .registerHandler(this.inhibitors);
  }

  public init() {
    for (const handler of this.handlers.values()) {
      handler.loadAll();
    }
  }

  /**
   * Login to the Discord gateway.
   * @param token Token of the Discord bot to boot up
   */
  public async connect(token?: string): Promise<TemplateClient> {
    await this.init();
    await super.login(token);
    this.application = await this.fetchApplication();
    return this;
  }

  public registerHandler<V extends AkairoHandler>(handler: V): this {
    this.handlers.set(handler.constructor.name, handler);
    return this;
  }

  /**
   * URL to invite the bot to a new guild.
   * Permissions are calculated automatically based on the rights of the bot
   * in the current server.
   */
  public get invite(): string | null {
    const { application } = this;
    if (!application) return null;

    const permissions = TemplateClient.basePermissions;

    [...this.commands.modules.values()].map((command) => {
      if (Array.isArray(command.clientPermissions)) {
        return [...command.clientPermissions].map((permission) =>
          permissions.add(permission)
        );
      }

      if (['string', 'number'].includes(typeof command.clientPermissions)) {
        return permissions.add(
          <number | PermissionResolvable>command.clientPermissions
        );
      }

      return null;
    });

    return `https://discordapp.com/oauth2/authorize?client_id=${application.id}&permissions=${permissions.bitfield}&scope=bot`;
  }

  /**
   * The base Permissions that the {@link Client#invite} asks for.
   * Defaults to [VIEW_CHANNEL, SEND_MESSAGES].
   */
  public static basePermissions = new Permissions(3072);
}

export interface TemplateClientOptions extends AkairoOptions, ClientOptions {
  prefix: ArrayLike<string>;
  owners: ArrayLike<string>;
}
