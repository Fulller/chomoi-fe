export default function useMessageByApiCodeV2({ apiCode }) {
  return function (key) {
    if (!apiCode[key]) {
      console.log(`useMessageByApiCodeV2 :: key :: ${key} :: notfound`);
    }
    return apiCode[key] || "No code";
  };
}
