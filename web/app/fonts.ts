import { Roboto_Flex, Sedgwick_Ave } from "next/font/google";

export const roboto_flex = Roboto_Flex({
  subsets: ["latin-ext"],
  display: "swap",
  axes: ["slnt", "wdth"],
  variable: "--font-roboto-flex",
});

export const sedgwick_ave = Sedgwick_Ave({
  subsets: ["latin-ext"],
  weight: '400'
});

