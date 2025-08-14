import '../index.css';
import type { Metadata } from 'next';
import StoreProvider from '@src/store/StoreProvider';
import { ThemeProvider } from '@src/context/themeContext/ThemeProvider';

export const metadata: Metadata = {
  title: 'RS React App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col px-4 py-4">
            <StoreProvider>
              <div id="root">{children}</div>
            </StoreProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
