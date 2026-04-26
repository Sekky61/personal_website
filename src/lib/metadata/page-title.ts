import { APP_DATA } from "@/lib/metadata/app-data";

export function pageTitle(title: string | null) {
  if (!title) {
    return APP_DATA.appName;
  }

  return `${title} | ${APP_DATA.appName}`;
}
