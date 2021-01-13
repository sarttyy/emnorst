
export const anonymous = <T>(value: T): T => value;

/**
 * arguments may hinder with optimization by the JavaScript engine.
 * @return the `arguments` directly
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Arguments = function(): IArguments {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
};
