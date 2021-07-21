type MySetType<T> = T[];

export default class MySet<T = unknown> {
    private set: MySetType<T> = [];

    constructor(initialValue?: T) {
        if (!initialValue) return;

        if (Array.isArray(initialValue)) {
            for (const item of initialValue) {
                this.add(item);
            }
            return;
        }

        this.add(initialValue);
    }

    get size(): number {
        return this.set.length;
    }

    add(value: T): this {
        if (!this.set.includes(value)) {
            this.set.push(value);
        }

        return this;
    }

    clear(): void {
        this.set = [];
    }

    delete(value: T): boolean {
        const propIndex = this.set.findIndex(setItem => setItem === value);

        if (propIndex > -1) {
            this.set = [
                ...this.set.slice(0, propIndex),
                ...this.set.slice(propIndex + 1)
            ];
            return true;
        }

        return false;
    }

    has(value: T): boolean {
        return this.set.includes(value);
    }

    forEach(callbackfn: (key: T, value: T, set: MySetType<T>) => void, thisArg: unknown = this): void {
        for (const setItem of this.set) {
            callbackfn.call(thisArg, setItem, setItem, this.set);
        }
    }

    values(): IterableIterator<T> {
        const set = this.set;
        let index = -1;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                index += 1;
                return {
                    done: index === set.length,
                    value: set[index]
                };
            }
        };
    }

    keys(): IterableIterator<T> {
        return this.values();
    }

    entries(): IterableIterator<[T, T]> {
        const set = this.set;
        let index = -1;

        return {
            [Symbol.iterator]() {
                return this;
            },

            next() {
                index += 1;
                const value = set[index];
                return {
                    done: index === set.length,
                    value: [value, value]
                };
            }
        };
    }

    get [Symbol.toStringTag](): string {
        return 'MySet';
    }

    [Symbol.iterator](): Iterator<T> {
        return this.values();
    }
}
