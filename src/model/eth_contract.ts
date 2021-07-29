export abstract class BaseContract {

    constructor(public address: string) {

    }

    abstract call<T>(methodName: string, ...args): Promise<T>;
}