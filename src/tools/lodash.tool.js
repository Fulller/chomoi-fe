import _ from "lodash";

export const standardForAPI_old = (obj, keyMappings) => {
  return _.mapKeys(obj, (value, key) => keyMappings[key] || key);
};
export function standardForAPI(object, keyMap) {
  return _.reduce(
    object,
    (result, value, key) => {
      const keys = keyMap[key] ? keyMap[key].split(".") : [key];

      let nestedObj = result;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nestedObj[keys[i]]) {
          nestedObj[keys[i]] = {};
        }
        nestedObj = nestedObj[keys[i]];
      }

      nestedObj[keys[keys.length - 1]] = value;

      return result;
    },
    {}
  );
}
