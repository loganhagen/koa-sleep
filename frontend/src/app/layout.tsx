import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/source-serif-pro/400.css";
import "@fontsource/source-serif-pro/700.css";
import "@fontsource/outfit/700.css";
import { cookies } from "next/headers";
import ThemeProvider from "../providers/themeProvider";
import Layout from "./_components/SplashLayout";
import { QueryProvider } from "../providers/queryProvider";
import UserProvider from "../providers/userProvider";

type ThemeMode = "light" | "dark";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = (await cookies()).get("theme-mode");

  const initialMode: ThemeMode =
    themeCookie?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <ThemeProvider initialMode={initialMode}>
          <UserProvider>
            <QueryProvider>
              <Layout>{children}</Layout>
            </QueryProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
