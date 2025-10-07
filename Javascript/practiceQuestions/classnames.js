/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */


export default function classNames(...args) {
  let validClassName = [];

  args.forEach((item) => {
    if (!item) {
      return;
    }

    const argType = typeof item;

    // handling if it is a valid number or string
    if (argType === "string" || argType === "number") {
      validClassName.push(item);
      return;
    }

    // check for arrays
    if (Array.isArray(item)) {
      validClassName.push(classNames(...item));
      return;
    }

    // now handle the objects
    if (argType === "object") {
      for (const key in item) {
        if (Object.hasOwn(item, key) && item[key]) {
          validClassName.push(key);
        }
      }
    }

    return;
  });
  return validClassName.join(" ");
}
