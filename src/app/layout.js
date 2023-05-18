import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
//import page from "../../public/assets/font/";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nohemi = localFont({
  src: [
    {
      path: "../../public/assets/font/Nohemi-Black-BF6438cc565e67b.woff",
    },

    {
      path: "../../public/assets/font/Nohemi-Bold-BF6438cc577b524.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-ExtraBold-BF6438cc5761ae2.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-ExtraLight-BF6438cc581502c.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-Light-BF6438cc5702321.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-Medium-BF6438cc57ddecd.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-Regular-BF6438cc579d934.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-SemiBold-BF6438cc57db2ff.woff",
    },
    {
      path: "../../public/assets/font/Nohemi-Thin-BF6438cc57e2011.woff",
    },
  ],
  variable: "--font-nohemi",
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  ${nohemi.variable}`}>
        {children}
      </body>
    </html>
  );
}
