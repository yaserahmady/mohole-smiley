import { tailwindColors } from "./tailwind-colors";
export const COLORS = {
  bg: tailwindColors.rose[200],
  fg: tailwindColors.black,
};

document.body.style.backgroundColor = COLORS.bg;
