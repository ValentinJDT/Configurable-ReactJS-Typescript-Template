import { FC, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';

const Home: FC = () => {
  const [tHome] = useTranslation('home');

  const config = useConfig();

  useEffect(() => {
    console.log(config);
  }, [config]);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>

      <h1 className='mt-5'>{tHome('config')}</h1> 
      <p>{config.get<string>("config.value")}</p>
      <p>{config.get<string>("config.a.name")} : {config.get<number>("config.a.index")}</p>
      <p>{config.get<string[]>("config.a.nexts").length }</p>
    </header>
  );
};

export default Home;
