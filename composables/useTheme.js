import { useDark, useToggle } from "@vueuse/core";

export default function () {
  const isDark = useDark({
    selector: "html",
    attribute: "data-theme",
    valueDark: "halloween",
    valueLight: "lofi",
  });

  return { isDark, useToggle };
}
