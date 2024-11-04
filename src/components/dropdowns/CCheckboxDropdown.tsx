import { Checkbox, Dropdown, Label } from 'flowbite-react';
import { FC, useEffect, useState } from 'react';

interface DropdownCheckboxValues {
  [key: string]: boolean;
}

interface DropdownCheckboxItemsProps {
  values: DropdownCheckboxValues;
  onChange?: ((values: { [key: string]: boolean }) => void) | undefined;
}

const DropdownCheckboxItems: FC<DropdownCheckboxItemsProps> = ({ values, onChange }) => {
  const [_values, setValues] = useState<{ [key: string]: boolean }>(values);

  useEffect(() => {
    if(_values == values) return;
    onChange && onChange(_values);
  }, [_values]);

  useEffect(() => {
    if(_values == values) return;
    setValues(values);
  }, [values])


  return (
    <>
      {Object.entries(_values).map(([key, value]) => (
        <Dropdown.Item
          key={key}
          className="flex space-x-3"
          onClick={() => setValues((prev) => ({ ...prev, [key]: !value }))}
        >
          <Checkbox
            checked={value}
            readOnly
          />
          <Label
            className="cursor-pointer"
          >
            {key}
          </Label>
        </Dropdown.Item>
      ))}
    </>
  );
};

export default DropdownCheckboxItems;

export type { DropdownCheckboxValues };
