export const promiseResolve = <T>(value?) => {
    return Promise.resolve<T>(value);
};

export const promiseAny = (promisesArray) => {
    const promiseErrors = new Array(promisesArray.length);
    let counter = 0;

    //return a new promise
    return new Promise((resolve, reject) => {
        promisesArray.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve) // resolve, when any of the input promise resolves
                .catch((error) => {
                    promiseErrors[counter] = error;
                    counter = counter + 1;
                    if (counter === promisesArray.length) {
                        // all promises rejected, reject outer promise
                        reject(promiseErrors);
                    }
                }); // reject, when any of the input promise rejects
        });
    });
};
