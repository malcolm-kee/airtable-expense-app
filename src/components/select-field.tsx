import * as React from 'react';
import { cx } from '~/lib/cx';
import { Label } from './label';

export interface SelectFieldProps
  extends React.ComponentPropsWithoutRef<'select'> {
  label?: React.ReactNode;
  onChangeValue?: (value: string) => void;
}

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(function SelectField({ label, onChangeValue, ...props }, forwardeRef) {
  return (
    <div>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <select
        onChange={onChangeValue && ((ev) => onChangeValue(ev.target.value))}
        {...props}
        className={cx(
          'block min-w-0 w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50',
          props.className
        )}
        ref={forwardeRef}
      />
    </div>
  );
});
