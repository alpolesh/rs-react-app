import '../index.css';
import type { Metadata } from 'next';
import StoreProvider from '@src/store/StoreProvider';

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
        <StoreProvider>
          <div id="root">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
