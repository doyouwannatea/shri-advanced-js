import { allKeysAndSymbols } from './allKeysAndSymbols';
import MySet from './MySet';

// allKeysAndSymbols
// -----------------------------------
const allKeys = allKeysAndSymbols({}); // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]
console.log('allKeys');
console.log(allKeys);
// -----------------------------------

// Proxy
// -----------------------------------
const proto = { value: 42 };
const obj = Object.create(proto);

Object.defineProperty(obj, 'year', {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
});

const symbol = Symbol('bazzinga');
obj[symbol] = 42;

// без proxy
console.log('value' in obj); // true
console.log('year' in obj); // true
console.log(symbol in obj); // true

const proxy = new Proxy(obj, { // реализация
    has(target, prop) {
        return Object.prototype.hasOwnProperty.call(target, prop);
    }
});

// с proxy
console.log('value' in proxy); // false
console.log('year' in proxy); // true
console.log(symbol in proxy); // true
// -----------------------------------

// MySet
// -----------------------------------
// тесты
console.log('Тесты для MySet');
const set = new MySet<unknown>([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log('хранит только уникальные значения');
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log('есть свойство size');
console.log(set.size); // 6

// работает в цикле for-of
console.log('работает в цикле for-of');
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
console.log('есть методы keys, values, entries');
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
console.log('есть метод clear');
set.clear();
console.log(set.size); // 0

const object: { value: unknown, getValue: () => unknown } = {
    value: null,
    getValue() { return this.value; }
};

const data = {
    value: 42
};

// есть метод add
console.log('есть метод add');
set.add(object);
set.add(data);

// есть метод delete
console.log('есть метод delete');
set.delete(data);

// есть метод has
console.log('есть метод has');
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log('и кое-что еще');
console.log(set === set.valueOf()); // true
console.log(String(set)); // [object MySet]
console.log(Object.prototype.toString.call(set)); // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    // @ts-ignore
    console.log(item.getValue.call(this)); // 42
}, data);
// -----------------------------------
