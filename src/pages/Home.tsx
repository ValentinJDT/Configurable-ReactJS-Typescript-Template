import { FC, useEffect } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';
import Tables from './Tables';

const Home: FC = () => {
  const [tHome, i18n] = useTranslation('home');

  const config = useConfig();

  return (
    <>
      <header className='w-full flex flex-col items-center'>
        <h1 className="mt-5">{tHome('config')}</h1>
        <p>{config.get<string>('config.value')}</p>
        <p>
          {config.get<string>('config.a.name')} : {config.get<number>('config.a.index')}
        </p>
        <p>{config.get<string[]>('config.a.nexts').length}</p>

        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button type="button" onClick={() => i18n.changeLanguage("fr")} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            FR
          </button>
          <button type="button" onClick={() => i18n.changeLanguage("en")} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            EN
          </button>
        </div>
      </header>
      <Tables />
    </>
  );
};

export default Home;
