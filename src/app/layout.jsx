import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Інвестиційний проєкт DOM HOTEL – готель поблизу Києва ",
  description: "DOM HOTEL –  готовий інвестиційний актив під Києвом. Працюючий готель із преміальною архітектурою, рестораноми і басейном. Гарантований дохід без сезонних ризиків. Обмежена кількість юнітів у продажу",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
