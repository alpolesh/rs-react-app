import SearchBar from '@components/searchbar/Searchbar';
import ThemeChanger from '@components/themeChanger/ThemeChanger';
import LangSwitcher from '@components/langSwitcher/LangSwitcher';
import { Link } from '@src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <div className="flex items-center">
      <Link href="/about">
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow">
          {t('linkAbout')}
        </button>
      </Link>
      <SearchBar />
      <div className="flex flex-col gap-2">
        <LangSwitcher />
        <ThemeChanger />
      </div>
    </div>
  );
}
