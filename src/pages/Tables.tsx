import { CustomFlowbiteTheme, Flowbite, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import CTable, { CTableHeader } from '../components/tables/CTable';
import { table } from 'console';

interface TableExternalConfig {
  headers: ({
    // Object key to get the value from the data, if not defined, the id will be used.
    object_key?: string | undefined; 
  } & CTableHeader)[];
}

const Tables = () => {
  const [tableExternalConfig, setTableExternalConfig] = useState<TableExternalConfig>({
    headers: [],
  });

  const [data, setData] = useState<{ id: number; name: string }[]>([
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
  ]);

  const config = useConfig();

  useEffect(() => {
    const tableConfig = config.get('config.tables.main') as TableExternalConfig;

    if (tableConfig == undefined || tableConfig.headers == undefined) return;
    setTableExternalConfig(tableConfig);
  }, [config]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div>
        <h1>Tables</h1>

        <CTable
          id="test"
          headers={tableExternalConfig.headers}
          data={data.map((item, index) => {
            const entries = Object.entries(item);
            return tableExternalConfig.headers.map((header) => {
              return entries.find(([key, value]) => header.id == key || header.object_key === key)?.[1];
            })
          })}
        />

      </div>
    </Flowbite>
  );
};

export default Tables;

const customTheme: CustomFlowbiteTheme = {
  table: {
    root: {
      base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400',
      shadow: 'absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black',
      wrapper: 'relative',
    },
    body: {
      base: 'group/body',
      cell: {
        base: 'px-6 py-1 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg',
      },
    },
    head: {
      base: 'group/head text-xs uppercase text-gray-700 dark:text-gray-400',
      cell: {
        base: 'bg-gray-50 px-6 py-2 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700',
      },
    },
    row: {
      base: 'group/row',
      hovered: 'hover:bg-gray-50 dark:hover:bg-gray-600',
      striped: 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700',
    },
  },
};
