export const throwNotImplemented = <T>() => {
    throw new Error("not implemented");
    return '' as any as T;
};