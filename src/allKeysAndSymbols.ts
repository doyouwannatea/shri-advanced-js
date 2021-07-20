export function allKeysAndSymbols(object: unknown): string[] {
    const keys = new Set([
        ...Object.getOwnPropertyNames(object),
        ...Object.getOwnPropertySymbols(object).map(symbolToString)
    ]);

    const prototype = Object.getPrototypeOf(object);

    if (prototype !== null) {
        keys.add('prototype');
        
        const prototypeKeys = allKeysAndSymbols(prototype);
        for (const key of prototypeKeys) {
            keys.add(key);
        }
    }

    return Array.from(keys);
}

function symbolToString(symbol: symbol): string {
    return symbol.toString();
}