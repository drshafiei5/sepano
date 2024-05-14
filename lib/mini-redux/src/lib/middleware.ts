import { TMiddleware } from "./types";

export class Middleware<Data> {
    #middlewares: Array<TMiddleware<Data>>;

    constructor() {
        this.#middlewares = [];
    }

    get middlewares() {
        return this.#middlewares;
    }

    use(fn: TMiddleware<Data>) {
        this.#middlewares.push(fn);
    }

    executeInit(next: Function) {
        const composition = this.#middlewares.reduceRight(
            (next, fn) => () => {
                return fn.init(next);
            }, next
        );

        return composition();
    }

    executeMiddleware(data: Data, next: Function) {
        const composition = this.#middlewares.reduceRight(
            (next, fn) => () => {
                fn.set(data, next);
            }, next
        );

        composition(data);
    }
}

