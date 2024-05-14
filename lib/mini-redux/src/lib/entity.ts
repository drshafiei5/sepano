import { Middleware } from "./middleware";
import { TMiddleware, TSubscriber } from "./types";


export class Entity<EntityState extends object> extends Middleware<EntityState> {
    #state: EntityState;
    #subscribers: Set<TSubscriber<EntityState>>;

    constructor(initiaState: EntityState) {
        super();
        this.#state = initiaState;
        this.#subscribers = new Set();
    }

    get state() {
        return this.#state;
    }

    subscribe(subscriber: TSubscriber<EntityState>) {
        this.#subscribers.add(subscriber);

        return () => {
            this.#subscribers.delete(subscriber);
        }
    }

    update(newValue: EntityState) {
        this.#state = { ...this.#state, ...newValue }
        this.#subscribers.forEach(cb => cb(this.#state));
        this.executeMiddleware(this.#state, () => {});
    }

    override use(fn: TMiddleware<EntityState>) {
        this.middlewares.push(fn);
        this.#state = this.executeInit(() => {});
    }
}