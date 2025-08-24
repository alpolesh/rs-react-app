import { useTranslations } from 'next-intl';

function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div className="text-center mt-10 text-red-600 text-xl">{t('title')}</div>
  );
}

export default NotFound;
