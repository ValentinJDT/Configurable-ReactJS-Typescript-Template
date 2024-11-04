import { FC, useEffect } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';

const Home: FC = () => {
  const [tHome] = useTranslation('home');

  const config = useConfig();

  return (
    <header className="App-header">
      <h1 className='mt-5'>{tHome('config')}</h1> 
      <p>{config.get<string>("config.value")}</p>
      <p>{config.get<string>("config.a.name")} : {config.get<number>("config.a.index")}</p>
      <p>{config.get<string[]>("config.a.nexts").length }</p>
    </header>
  );
};

export default Home;
