// import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import Chakrawrap from "./component/app_wraps/Chakrawrap";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  // variable: '--font-raleway', // optional: use this if you want to apply with CSS variables
})

export const metadata = {
   title: "Bringo Supermarket",
  description: "Bringo Dashboard",
  icons: {
    icon: "/bringologo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={raleway?.className}
      >
        <Suspense fallback={<Loading />}>
        <Chakrawrap>
        {children}
        </Chakrawrap>
        </Suspense>
      </body>
    </html>
  );
}
