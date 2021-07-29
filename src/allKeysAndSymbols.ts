export function allKeysAndSymbols(object: unknown): string[] {
    const keys = new Set<string>();

    while (object !== null) {
        const propertyNames = Object.getOwnPropertyNames(object);
        const propertySymbols = Object.getOwnPropertySymbols(object).map(String);

        for (const property of propertyNames) {
            keys.add(property);
        }

        for (const symbol of propertySymbols) {
            keys.add(symbol);
        }

        object = Object.getPrototypeOf(object);
    }

    return Array.from(keys);
}