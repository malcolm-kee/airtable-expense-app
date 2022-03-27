import * as React from 'react';
import { cx } from '~/lib/cx';

export const Label = (props: React.ComponentPropsWithoutRef<'label'>) => {
  return (
    <label {...props} className={cx('block text-gray-700', props.className)} />
  );
};
