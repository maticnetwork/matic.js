export interface IEventBusPromise<T> extends Promise<T> {
    on(event: string, cb: Function);
    emit(event: string, ...args);
    destroy();
}

export const eventBusPromise = function <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    const promise: IEventBusPromise<T> = new Promise(executor) as any;
    const eventBus = new EventBus();
    promise.on = eventBus.on.bind(eventBus);
    promise.emit = eventBus.emit.bind(eventBus);
    return promise;
};

export class EventBus {

    constructor(ctx?) {
        this._ctx = ctx;
    }

    private _ctx;

    private _events: {
        [key: string]: Function[]
    } = {};

    on(event: string, cb: Function) {
        if (this._events[event] == null) {
            this._events[event] = [];
        }
        this._events[event].push(cb);
        return this;
    }

    off(event: string, cb: Function) {
        if (this._events[event]) {
            if (cb) {
                const index = this._events[event].indexOf(cb);
                this._events[event].splice(index, 1);
            }
            else {
                this._events[event] = [];
            }
        }
    }

    emit(event: string, ...args) {
        const events = this._events[event] || [];
        return Promise.all(
            events.map(cb => {
                const result = cb.call(this._ctx, ...args);
                return result && result.then ? result : Promise.resolve(result);
            })
        );
    }

    destroy() {
        this._events = null;
        this._ctx = null;
    }
}