/**
 * Converts a plain object to a URLSearchParams instance.
 *
 * This utility function transforms a key-value object into a query string format
 * suitable for use in URLs or HTTP requests. If a value is an array, each element
 * will be appended using the same key (mimicking multi-value query params).
 *
 * @param {Object} obj - The object to convert. Values can be strings, numbers, or arrays.
 * @returns {URLSearchParams} A URLSearchParams instance ready for fetch or API requests.
 *
 * @example
 * objectToSearchParams({ category: 'laptops', price: [100, 500] }).toString();
 * Output: 'category=laptops&price=100&price=500'
*/
export const objectToSearchParams = (obj) => {
  const query = new URLSearchParams();

  if (!obj) return query;

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => query.append(key, val));
    } else {
      query.append(key, value);
    }
  });

  return query;
};