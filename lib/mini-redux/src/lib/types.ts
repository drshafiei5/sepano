
export type TSubscriber<T> = (state: T) => void;
export type TMiddleware<Data> = {
    set: (data: Data, next: Function) => void
    init: (next: Function) => Data
}