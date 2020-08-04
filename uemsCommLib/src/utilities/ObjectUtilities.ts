/**
 * Returns whether the given key is present within the object with support for undefined and null values. The call is
 * made against the object prototype so it is safe to pass in nearly any value to this function as the data.
 * @param data the data object in which keys should be searched
 * @param key the key to search for within the data
 */
export const has = (data: any, key: string | number | symbol | undefined | null): boolean => {
    if (data === undefined || data === null || key === undefined || key === null) return false;
    return Object.prototype.hasOwnProperty.call(data, key);
}
