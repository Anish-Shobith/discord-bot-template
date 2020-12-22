/**
 * Utility to make a method decorator with lighter syntax and inferred types.
 *
 * ```ts
 * // Enumerable function
 *	function enumerable(value: boolean) {
 *		return createMethodDecorator((_target, _propertyKey, descriptor) => {
 *			descriptor.enumerable = value;
 *		});
 *	}
 * ```
 * @param fn The method to decorate
 */
export function createMethodDecorator(fn: MethodDecorator): MethodDecorator {
  return fn;
}
