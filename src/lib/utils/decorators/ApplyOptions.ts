import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import { createClassDecorator } from './createClassDecorator';

export type Constructor<T> = new (...args: any[]) => T;

/**
 * Applies options onto a given `AkairoModule` using a class decorator.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApplyOptions<T extends AkairoModuleOptions>(
  id: string,
  options: T
) {
  return createClassDecorator(
    (target: Constructor<AkairoModule>) =>
      class extends target {
        public constructor() {
          super(id, options);
        }
      }
  );
}
