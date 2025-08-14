import { useTranslations } from 'next-intl';

function About() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-4">{t('description')}</p>
      <p>
        {t('linkMessage.before')}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800"
          rel="noreferrer"
        >
          {t('linkMessage.linkText')}
        </a>
        {t('linkMessage.after')}
      </p>
    </div>
  );
}

export default About;
