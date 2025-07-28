function unflattenObject(flatObj) {
  const result = {};

  for (const flatKey in flatObj) {
    const keys = flatKey.split('.');
    let current = result;   

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;
      const isArrayIndex = !isNaN(keys[i + 1]); // Look ahead

      // Convert numeric keys to number type
      const normalizedKey = !isNaN(key) ? Number(key) : key;

      if (isLast) {
        current[normalizedKey] = flatObj[flatKey];
      } else {
        if (!(normalizedKey in current)) {
          current[normalizedKey] = isArrayIndex ? [] : {};
        }
        current = current[normalizedKey];
      }
    }
  }

  return result;
}
const input = {
  "a": 1,
  "b.c": 2,
  "b.d.0": 3,
  "b.d.1": 4,
  "e.f.g": 5,
  "h.0": 6,
  "h.1.i": 7,
};

console.log(unflattenObject(input));
