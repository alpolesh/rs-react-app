import '@src/index.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@src/i18n/routing';
import type { Metadata } from 'next';
import StoreProvider from '@src/store/StoreProvider';
import { ThemeProvider } from '@src/context/themeContext/ThemeProvider';

export const metadata: Metadata = {
  title: 'RS React App',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col px-4 py-4">
            <StoreProvider>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </StoreProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
