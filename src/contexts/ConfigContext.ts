import React from 'react';

const CONFIG_FILES = ['config'];

interface NestedObject {
  [key: string]: NestedObject | any;
}

interface Config {
  get<T>(path: string): T | string;
  object: NestedObject;
}

class ParseConfig implements Config {
  object: NestedObject;

  constructor(parsedConfig: Object) {
    this.object = parsedConfig;
  }

  get<T>(path: string): T | string {
    const parts = path.split('.');
    let current: any = this.object;

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
  const parsedConfig: NestedObject = {};

  for (const file of CONFIG_FILES) {
    await fetch(`/config/${file}.json`).then(async (response) => {
      parsedConfig[file] = await response
        .json()
        .catch(async () => await fetch(`/default/${file}.json`).then(async (response) => await response.json()));
    });
  }

  onLoad && onLoad(new ParseConfig(parsedConfig));
};

const ConfigContext = React.createContext<Config>(EMPTY_CONFIG);

const useConfig = () => React.useContext(ConfigContext);

export { loadConfig, ConfigContext, useConfig, EMPTY_CONFIG };

export type { Config };
