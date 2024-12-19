import { type MaterialTheme, loadTheme } from "./generateTheme";

function convertToTailwindColors(theme: MaterialTheme) {
  console.log("@theme {\n");
  for (const paletteName in theme.palettes) {
    const palette = theme.palettes[paletteName];
    for (const colorName in palette) {
      //   --color-primary-40: var(--md-ref-palette-primary40);
      const line = `  --color-${paletteName}-${colorName}: var(--md-ref-palette-${paletteName}${colorName});`;
      console.log(line);
    }
  }
  console.log("\n");
}

async function main() {
  const theme = await loadTheme("./material-theme.json");
  convertToTailwindColors(theme);
}

main();
