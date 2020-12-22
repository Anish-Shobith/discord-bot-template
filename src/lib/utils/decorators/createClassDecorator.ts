/**
 * Utility to make a class decorator with lighter syntax and inferred types.
 * @param fn The class to decorate
 * @see [[ApplyOptions]]
 */
export function createClassDecorator<
  TFunction extends (...args: any[]) => void
>(fn: TFunction): ClassDecorator {
  return fn;
}
