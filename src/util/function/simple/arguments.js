
// 引数はJavaScriptエンジンによる最適化を妨げる可能性があります。

/**
 * arguments may hinder with optimization by the JavaScript engine.
 * @return {IArguments} the `arguments` directly
 */
export const Arguments = function() {
    return arguments;
};
