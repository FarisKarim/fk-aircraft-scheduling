import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aircraft Scheduling",
  description: "Aircraft Scheduling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-blue-100">
        {children}
        </div>
      </body>
    </html>
  );
}
