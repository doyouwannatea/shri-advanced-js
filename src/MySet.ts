type MySetType<T> = Record<string | symbol | number, T>;

export default class MySet<T = unknown> {
    private set: MySetType<T> = {} as MySetType<T>;

    constructor(initialValue?: T) {
        if (!initialValue) return;

        if (Array.isArray(initialValue)) {
            for (const value of initialValue) {
                this.add(value);
            }
            return;
        }

        this.add(initialValue);
    }

    get size(): number {
        return Object.keys(this.set).length;
    }

    add(value: T): this {
        const key = this.makeKey(value);

        this.set[key] = value;
        return this;
    }

    clear(): void {
        this.set = {} as MySetType<T>;
    }

    delete(value: T): boolean {
        const key = this.makeKey(value);

        if (Object.prototype.hasOwnProperty.call(this.set, key)) {
            delete this.set[key];
            return true;
        }
        return false;
    }

    has(value: T): boolean {
        const key = this.makeKey(value);
        return value === this.set[key];
    }

    forEach(callbackfn: (key: T, value: T, set: MySetType<T>) => void, thisArg?: unknown): void {
        for (const key in this.set) {
            if (Object.prototype.hasOwnProperty.call(this.set, key)) {
                callbackfn.bind(thisArg || this)(this.set[key], this.set[key], this.set);
            }
        }
    }

    values(): IterableIterator<T> {
        const set = this.set;
        const keys = Object.getOwnPropertyNames(set);
        let index = -1;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                index += 1;
                return {
                    done: index === keys.length,
                    value: set[keys[index]]
                };
            }
        };
    }

    keys(): IterableIterator<T> {
        return this.values();
    }

    entries(): IterableIterator<[T, T]> {
        const set = this.set;
        const keys = Object.getOwnPropertyNames(set);
        let index = -1;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                index += 1;
                const value = set[keys[index]];
                return {
                    done: index === keys.length,
                    value: [value, value]
                };
            }
        };
    }

    private makeKey(value: T): string {
        if (typeof value === 'object' || typeof value === 'function') {
            return JSON.stringify(value);
        }

        return String(value);
    }

    get [Symbol.toStringTag](): string {
        return 'MySet';
    }

    [Symbol.iterator](): Iterator<T> {
        const set = this.set;
        const keys = Object.getOwnPropertyNames(set);
        let index = -1;

        return {
            next() {
                index += 1;
                return {
                    done: index === keys.length,
                    value: set[keys[index]]
                };
            }
        };
    }
}
