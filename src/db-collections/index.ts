import {
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db";
import { z } from "zod";
import {
  THEME_COLLECTION_ID,
  THEME_PREFERENCE_ID,
  THEME_STORAGE_KEY,
} from "#/lib/theme";

const ThemePreferenceSchema = z.object({
  id: z.literal(THEME_PREFERENCE_ID),
  mode: z.enum(["light", "dark", "auto"]),
});

export type ThemePreference = z.infer<typeof ThemePreferenceSchema>;

export const themeCollection = createCollection(
  localStorageCollectionOptions({
    id: THEME_COLLECTION_ID,
    storageKey: THEME_STORAGE_KEY,
    getKey: (themePreference) => themePreference.id,
    schema: ThemePreferenceSchema,
  }),
);
