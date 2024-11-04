import { Checkbox, CustomFlowbiteTheme, Dropdown, Flowbite, Label, Select, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import CTable, { CTableHeader } from '../components/tables/CTable';
import { table } from 'console';
import DropdownCheckboxItems, { DropdownCheckboxValues } from '../components/dropdowns/CCheckboxDropdown';
import { useLocalConfig } from '../hooks/useLocalConfig';

interface TableExternalConfig {
  headers: ({
    object_key?: string | undefined;
    showing_default?: boolean | undefined;
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

  const [values, setValues] = useLocalConfig<DropdownCheckboxValues>('tables', {});

  const config = useConfig();

  useEffect(() => {
    const tableConfig = config.get('config.tables.main') as TableExternalConfig;

    if (tableConfig == undefined || tableConfig.headers == undefined) return;
    setTableExternalConfig(tableConfig);
    setValues(
      tableConfig.headers.reduce(
        (acc, header) => {
          if (acc[header.id] == undefined) acc[header.id] = header.showing_default ?? true;
          return acc;
        },
        (values ?? {}) as DropdownCheckboxValues
      )
    );
  }, [config]);

  const filteredHeaders = tableExternalConfig.headers.filter((header) => values[header.id]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div>
        <h1 className="m-11">POC : Table configurable v1</h1>

        <div className="container mx-auto px-8">
          <Dropdown dismissOnClick={false} size="sm" label="Colonnes" color="light">
            <DropdownCheckboxItems values={values} onChange={(values) => setValues(values)} />
          </Dropdown>

          <CTable
            id="test"
            headers={filteredHeaders}
            data={data.map((item, index) => {
              const entries = Object.entries(item);
              return filteredHeaders.map(
                (header) => entries.find(([key, value]) => header.id == key || header.object_key === key)?.[1]
              );
            })}
          />
        </div>
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
