// Load a .json file from material theme and output a tailwindcss color theme extension
// use bun to run this script

type MaterialTheme = {
  description: string;
  seed: string;
  coreColors: any;
  extendedColors: any;
  schemes: Record<SchemeName, Scheme>;
  palettes: Record<PaletteName, Palette>;
};

type Palette = Record<PaletteNumbers, string>;
type Scheme = Record<SchemeColors, string>;

type SchemeName =
  | "dark"
  | "dark-high-contrast"
  | "dark-medium-contrast"
  | "light"
  | "light-high-contrast"
  | "light-medium-contrast";

type SchemeColors =
  | "background"
  | "error"
  | "errorContainer"
  | "inverseOnSurface"
  | "inversePrimary"
  | "inverseSurface"
  | "onBackground"
  | "onError"
  | "onErrorContainer"
  | "onPrimary"
  | "onPrimaryContainer"
  | "onPrimaryFixed"
  | "onPrimaryFixedVariant"
  | "onSecondary"
  | "onSecondaryContainer"
  | "onSecondaryFixed"
  | "onSecondaryFixedVariant"
  | "onSurface"
  | "onSurfaceVariant"
  | "onTertiary"
  | "onTertiaryContainer"
  | "onTertiaryFixed"
  | "onTertiaryFixedVariant"
  | "outline"
  | "outlineVariant"
  | "primary"
  | "primaryContainer"
  | "primaryFixed"
  | "primaryFixedDim"
  | "scrim"
  | "secondary"
  | "secondaryContainer"
  | "secondaryFixed"
  | "secondaryFixedDim"
  | "shadow"
  | "surface"
  | "surfaceBright"
  | "surfaceContainer"
  | "surfaceContainerHigh"
  | "surfaceContainerHighest"
  | "surfaceContainerLow"
  | "surfaceContainerLowest"
  | "surfaceDim"
  | "surfaceTint"
  | "surfaceVariant"
  | "tertiary"
  | "tertiaryContainer"
  | "tertiaryFixed"
  | "tertiaryFixedDim";

type PaletteName =
  | "neutral"
  | "neutral-variant"
  | "primary"
  | "secondary"
  | "tertiary";

type PaletteNumbers =
  | "0"
  | "10"
  | "100"
  | "15"
  | "20"
  | "25"
  | "30"
  | "35"
  | "40"
  | "5"
  | "50"
  | "60"
  | "70"
  | "80"
  | "90"
  | "95"
  | "98"
  | "99";

async function loadTheme(path: string): Promise<MaterialTheme> {
  const themeFile = Bun.file(path);
  const text = await themeFile.text();
  const json = JSON.parse(text) as MaterialTheme;
  return json;
}

/**
 * Convert the loaded material theme to a tailwindcss theme
 */
function convertToTailwind(theme: MaterialTheme) {
  const colorExtend: object = {};

  // For each palette, add the palette and add DEFAULT: palette-40
  for (const paletteName in theme.palettes) {
    const palette = theme.palettes[paletteName as PaletteName];
    const paletteWithDefault = {
      ...palette,
      DEFAULT: palette["40"],
    };
    // @ts-ignore
    colorExtend[paletteName] = paletteWithDefault;
  }

  // add the schemes to colors
  for (const schemeName in theme.schemes) {
    const scheme = theme.schemes[schemeName as SchemeName];
    // @ts-ignore
    colorExtend[schemeName] = scheme;
  }

  return colorExtend;
}

async function main() {
  const theme = await loadTheme("./material-theme.json");
  const tailwind = convertToTailwind(theme);
  console.log(tailwind);
}

main();
