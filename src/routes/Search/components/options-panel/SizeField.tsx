import { useState, useEffect } from 'react';
import * as React from 'react';
import t from 'utils/tcomb-form';

import * as UI from 'types/ui';

import { ByteUnits, formatUnit, parseUnit } from 'utils/ValueFormat';


interface SizeFieldProps {
  moduleT: UI.ModuleTranslator;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange: (size: number | null) => void;
  value: number;
}

type Props = SizeFieldProps;


const DEFAULT_UNIT_INDEX = 2;

const toFieldValues = (initialValue: number) => {
  const { value, unitIndex } = parseUnit(initialValue, ByteUnits, 1024);
  return {
    value,
    unitIndex: !!initialValue ? unitIndex : DEFAULT_UNIT_INDEX,
  }
}

const SizeField: React.FC<Props> = ({ inputProps, moduleT, onChange, value }) => {
  const initialData = toFieldValues(value)
  const [ displayValue, setDisplayValue ] = useState<number | undefined>(initialData.value);
  const [ unitIndex, setUnitIndex ] = useState<number>(initialData.unitIndex);

  const valueToBytes = () => {
    let ret = displayValue || 0;
    if (!!unitIndex) {
      for (let i = 1; i <= unitIndex; i++) {
        ret *= 1024;
      }
    }
    
    return ret;
  };

  // Fire internal changes
  useEffect(
    () => {
      const newValue = valueToBytes();
      if (newValue !== value) {
        onChange(newValue);
      }
    },
    [ unitIndex, displayValue ]
  );

  // Update fields on external changes
  useEffect(
    () => {
      const curBytes = valueToBytes();
      if (value !== curBytes) {
        const newData = toFieldValues(value);
        setDisplayValue(newData.value);
        setUnitIndex(newData.unitIndex);
      }
    },
    [ value ]
  );
  
  return (
    <div style={{ display: 'flex' }}>
      <input
        className="ui input"
        type="number"
        { ...inputProps }
        min={ 0 }
        value={ displayValue || '' }
        onChange={ evt => {
          const newValue = !!evt.target.value ? parseInt(evt.target.value) : null;
          if (!!newValue) {
            setDisplayValue(newValue);
          } else {
            setDisplayValue(undefined);
          }
        } }
      />
      <select 
        className="ui select" 
        style={{ maxWidth: '100px' }}
        value={ ByteUnits[unitIndex] }
        onChange={ evt => {
          setUnitIndex(evt.target.selectedIndex);
        } }
      >
        { ByteUnits.map((unit, index) => (
          <option 
            key={ unit }
            value={ unit }
          >
            { formatUnit(unit, moduleT.plainT) }
          </option>
        )) }
      </select>
    </div>
  );
};


type TCombTemplate = { 
  renderInput: (locals: UI.FormLocals<any, number>) => React.ReactNode; 
};

const FileTypeField: TCombTemplate = {
  renderInput(locals) {
    return (
      <SizeField 
        onChange={ locals.onChange }
        value={ !!locals.value ? parseInt(locals.value as any) : 0 }
        moduleT={ locals.context.formT }
      />
    );
  }
};

export default t.form.Form.templates.textbox.clone(FileTypeField);
