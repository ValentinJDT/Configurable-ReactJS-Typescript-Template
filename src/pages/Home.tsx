import { FC, useEffect } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';
import Tables from './Tables';

const Home: FC = () => {
  const [tHome] = useTranslation('home');

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
      </header>
      <Tables />
    </>
  );
};

export default Home;
