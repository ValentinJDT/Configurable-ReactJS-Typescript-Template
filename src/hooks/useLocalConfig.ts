import { useLocalStorage } from '@uidotdev/usehooks';
import { Dispatch, useEffect } from 'react';

/**
 * Interface to define the saved config structure.
 * @param {T} T type of the saved config
 */
interface SavedConfig<T> {
  [key: string]: T;
}

/**
 * Hook to manage a single item in local storage.
 * @param {string} key subkey who contains the item
 * @param {T} defaultValue default value of the item
 * @param {string} defaultMainKey define the default local storage key
 */
const useLocalConfig = <T>(
  key: string,
  defaultValue: T,
  defaultMainKey: string = 'states'
): [T, Dispatch<React.SetStateAction<T>>] => {
  const [savedConfig, setConfig] = useLocalStorage<SavedConfig<T>>(defaultMainKey, { [key]: defaultValue });

  if (savedConfig[key] === undefined) setConfig({ ...savedConfig, [key]: defaultValue });

  const set: Dispatch<React.SetStateAction<T>> = (value: React.SetStateAction<T>) => {
    if (value instanceof Function) {
      setConfig({ ...savedConfig, [key]: value(savedConfig[key]) });
      return;
    }

    setConfig({ ...savedConfig, [key]: value });
  };

  return [savedConfig[key], set];
};

/**
 * Hook to manage a list of items in local storage.
 * @param {string} key subkey who contains the list
 * @param {string} defaultMainKey define the default local storage key
 * @return {[object, add, remove]} components to manage a list of items in local storage
 */
const useLocalListConfig = <T>(
  key: string,
  defaultMainKey: string = 'states'
): [T[], (value: T) => void, (value: T) => void] => {
  const [savedConfig, setConfig] = useLocalStorage<SavedConfig<T[]>>(defaultMainKey, { [key]: [] });

  // If the key is not defined, set his value to an empty array
  if (savedConfig[key] === undefined) setConfig({ ...savedConfig, [key]: [] });

  /** Add a value to the current list. */
  const add = (value: T) => {
    if (savedConfig[key].includes(value)) return;
    setConfig({ ...savedConfig, [key]: [...savedConfig[key], value] });
  };

  /** Remove a value from the current list. */
  const remove = (value: T) => {
    setConfig({ ...savedConfig, [key]: savedConfig[key].filter((item) => item !== value) });
  };

  return [savedConfig[key] || [], add, remove];
};

export { useLocalConfig, useLocalListConfig };

export type { SavedConfig };
