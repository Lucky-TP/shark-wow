import type { Metadata } from "next";

import "./globals.css";

import Layout from "src/components/Layout";

export const metadata: Metadata = {
  title: "Shark WoW",
  description: "Funding for Startup and SMEs",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className=''>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
