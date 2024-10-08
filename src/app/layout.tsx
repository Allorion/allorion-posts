import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ReactQueryProvider>
          <div>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
