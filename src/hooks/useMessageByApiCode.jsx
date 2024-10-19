import apiCode from "@configs/apiCode.config";

export default function useMessageByApiCode() {
  return function (key) {
    if (!apiCode[key]) {
      console.log(`useMessageByApiCode :: key :: ${key} :: notfound`);
    }
    return apiCode[key] || "No code";
  };
}
