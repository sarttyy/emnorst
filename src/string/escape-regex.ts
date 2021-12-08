const REGEX_META_CHAR = /[$^()?*+{}\-.[\]\\|]/g;

/**
 * Escapes regex metacharacters.
 * @example escapeRegex("(foo|bar)+") === String.raw`\(foo\|bar\)\+`
 */
export const escapeRegex = (reStr: string): string => reStr.replace(REGEX_META_CHAR, "\\$&");
