import React from 'react';

interface NestedObject {
  [key: string]: NestedObject | any;
}

interface Config {
  get<T>(path: string): T | string;
}

class ParseConfig implements Config {
  private parsedConfig: NestedObject;

  constructor(parsedConfig: Object) {
    this.parsedConfig = parsedConfig;
  }


 get<T>(path: string): T | string {
    const parts = path.split('.');
    let current: any = this.parsedConfig;
  
    for (const part of parts) {
      if (current && typeof current[part] !== 'undefined') {
        current = current[part];
      } else {
        return path;
      }
    }
  
    return current as T;
  }

}

const EMPTY_CONFIG = new ParseConfig({});

const loadConfig = async (onLoad: (data: Config) => void) => {

  const files = ['config'];

  const parsedConfig: NestedObject = {};

  for (const file of files) {
    await fetch(`/frontend/config/${file}.json`).then(async (response) => {
      parsedConfig[file] = await response
        .json()
        .catch(
          async () => await fetch(`/frontend/default/${file}.json`).then(async (response) => await response.json())
        );
    });
  }

  onLoad && onLoad(new ParseConfig(parsedConfig));
};


const ConfigContext = React.createContext<Config>(EMPTY_CONFIG);

const useConfig = () => React.useContext(ConfigContext);

export { loadConfig, ConfigContext, useConfig, EMPTY_CONFIG };

export type { Config };