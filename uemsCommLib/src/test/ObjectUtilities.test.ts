import assert from "assert";
import { has } from "../utilities/ObjectUtilities";

describe('ObjectUtilities', () => {
    describe('has', () => {
        it('should return false on null and undefined values', () => {
            assert(!has(null, 'a'));
            assert(!has(undefined, 'a'));
            assert(!has({}, null));
            assert(!has({}, undefined));
        })

        it('should return false on non-object types', () => {
            assert(!has([], 'a'))
            assert(!has(3, 'a'))
            assert(!has("abc", 'a'))
        })

        it('should return correctly on non-object types that have been bound with properties', () => {
            type Broken<T> = T & {
                property: string,
            };
            const make = <T extends any>(value: T) => {
                const broken = value as unknown as Broken<T>;
                broken.property = 'present';
                return broken;
            }

            assert(has(make([]), 'property'));
            assert(has(make(() => false), 'property'));

            assert(!has(make([]), 'property2'));
            assert(!has(make(() => false), 'property2'));
        })

        it('should return properly on real objects with properties', () => {
            const obj = {
                a: 3,
            };

            assert(has(obj, 'a'));
            assert(!has(obj, 'b'));
        })
    })
})
