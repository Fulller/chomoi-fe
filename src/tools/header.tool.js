import { getLS } from "@tools/localStorage.tool";
import _ from "lodash";

export function getHeaders(headerField = ["accessToken"], options = {}) {
  const { accessToken } = getLS("tokens");
  return { ..._.pick(getLS("tokens"), headerField), ...options };
}
