'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@src/i18n/navigation';

function LangSwitcher() {
  const t = useTranslations('LangSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    const queryString = searchParams.toString();
    const pathWithQuery = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(pathWithQuery, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      <label htmlFor="lang-switcher" className="font-medium">
        {t('label')}
      </label>
      <select
        id="lang-switcher"
        value={locale}
        onChange={handleLangChange}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="en">{t('options.en')}</option>
        <option value="ru">{t('options.ru')}</option>
      </select>
    </div>
  );
}

export default LangSwitcher;
