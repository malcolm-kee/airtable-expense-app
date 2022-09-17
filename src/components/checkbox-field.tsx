import * as React from 'react';
import { cx } from '~/lib/cx';
import { Label } from './label';

export interface CheckboxFieldProps
  extends React.ComponentPropsWithoutRef<'input'> {
  label?: React.ReactNode;
  onChangeValue?: (value: boolean) => void;
}

export const CheckboxField = React.forwardRef<
  HTMLInputElement,
  CheckboxFieldProps
>(function CheckboxField({ label, onChangeValue, ...props }, forwardeRef) {
  return (
    <div className="flex items-center gap-2">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <input
        type="checkbox"
        onChange={onChangeValue && ((ev) => onChangeValue(ev.target.checked))}
        {...props}
        className={cx(
          'h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500',
          props.disabled && 'bg-gray-200',
          props.className
        )}
        ref={forwardeRef}
      />
    </div>
  );
});
