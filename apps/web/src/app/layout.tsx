import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRS Logistics — Improving efficiency with logistics",
  description:
    "Reliable transport. Real-time tracking. Tailored logistics for your business — by sea, ground, rail, and air.",
};

export default ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} bg-white font-body antialiased`}>
        <ThemeProvider attribute="class" forcedTheme="light">
          <div className="isolate">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
};
