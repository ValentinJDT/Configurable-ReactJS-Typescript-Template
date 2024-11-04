import { FC, ReactNode, useEffect, useState } from 'react';
import { HiOutlineChevronUpDown, HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi2';
import { Table } from 'flowbite-react';
import { useLocalConfig } from '../../hooks/useLocalConfig';

type SortType = 'ASC' | 'DESC' | 'UNSORTED';

/**
 * TableHeader interface.
 * It defines the id and the component to be displayed in the table header.
 */
interface CTableHeader {
  id: string;
  component: ReactNode;
  sortable?: boolean;
  default?: SortType | undefined;
  alignCenter?: boolean;
}

/**
 * SortProps interface.
 * It defines the sort state for the table.
 */
interface SortProps {
  [id: string]: SortType;
}

/**
 * Props for the CustomTable component.
 * It define the headers and data to be displayed in the table.
 */
interface TableProps {
  id?: string | undefined;
  headers: CTableHeader[];
  footer?: JSX.Element[];
  data: (
    | ReactNode
    | {
        '@className'?: string;
        'element': ReactNode;
      }
  )[][];
  onSortColumns?: (sortProps: SortProps) => void | undefined;
}

/**
 * CustomTable component.
 * It displays a table with the given headers and data.
 * @param {TableProps} props
 * @return {JSX.Element}
 */
const CTable: FC<TableProps> = ({ id = undefined, headers, data, onSortColumns, footer = [] }) => {
  const [savedSort, setSavedSort] = useLocalConfig<SortProps>('table-' + id, {}, 'sorts');
  const [sort, setSort] = useState<SortProps>(savedSort ?? {});

  useEffect(() => {
    if (onSortColumns) {
      const filtered = Object.entries(sort).filter(([_, value]) => value !== 'UNSORTED');
      onSortColumns(Object.fromEntries(filtered));
    }
    setSavedSort(sort);
  }, [sort]);

  const getSortIcon = (sortType: SortType | undefined) => {
    switch (sortType) {
      case 'ASC':
        return <HiOutlineChevronUp />;
      case 'DESC':
        return <HiOutlineChevronDown />;
      case 'UNSORTED':
        return <HiOutlineChevronUpDown />;
    }
  };

  return (
    <Table className="overflow-auto">
      <Table.Head>
        {headers.map((header, index) => {
          if (!sort[header.id] && header.default) {
            setSort({
              ...sort,
              [header.id]: header.default,
            });
          }

          return (
            <Table.HeadCell
              key={index}
              onClick={() => {
                if (header.sortable) {
                  const newValue = sort[header.id] === 'ASC' ? 'DESC' : sort[header.id] === 'DESC' ? 'UNSORTED' : 'ASC';

                  if (sort[header.id]) {
                    delete sort[header.id];
                  }

                  setSort({
                    ...sort,
                    [header.id]: newValue,
                  });
                }
              }}
            >
              <span
                className={
                  'flex flex-row items-center space-x-1 ' +
                  (!!header.sortable
                    ? 'cursor-pointer select-none '
                    : '' + (!!header.alignCenter ? 'justify-center' : ''))
                }
              >
                {!!header.sortable && getSortIcon(sort[header.id])}
                {header.component}
              </span>
            </Table.HeadCell>
          );
        })}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((row, rowIndex) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={rowIndex}>
            {row.map((column, columnIndex) => {
              if (column && typeof column === 'object' && 'element' in column) {
                return (
                  <Table.Cell
                    key={columnIndex}
                    className={column['@className'] || undefined}
                    children={column.element}
                  />
                );
              } else {
                if (headers[columnIndex] == undefined) return <Table.Cell key={columnIndex} children={column} />;

                const alignCenter = headers[columnIndex].alignCenter ? 'flex flex-row justify-center' : '';

                return <Table.Cell key={columnIndex} children={column} className={alignCenter} />;
              }
            })}
          </Table.Row>
        ))}
        {footer != undefined && footer.length > 0 && (
          <Table.Row>
            {footer.map((column, columnIndex) => (
              <Table.Cell key={columnIndex} children={column} />
            ))}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default CTable;

export type { CTableHeader, SortProps };
