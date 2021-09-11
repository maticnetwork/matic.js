export const promiseResolve = <T>(value?) => {
    return Promise.resolve<T>(value);
};