import { Open_Sans, Inter, Epilogue, Montserrat, Lato, Roboto, Poppins, Lora } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClients from "@/components/BootstrapClients";
import ToastProvider from "@/components/ToastProvider";
import Providers from "@/components/Providers";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});


export const metadata = {
  title: "Luxurious Alley",
  description: "",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${epilogue.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${interFont.variable} ${openSans.variable} ${lora.variable}`}>
        <ToastProvider /> {/* Global toast notifications */}
        <Providers>
          {children}
        </Providers>
        <BootstrapClients />
      </body>
    </html>
  );
}
