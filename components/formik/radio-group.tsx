import { useField } from 'formik';
import React from 'react';
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  CommonErrorText14Weight500,
  Text16Weight500,
} from '../common/styled/typography-styed';

const RadioGroupFormik = (props: any) => {
  const { name, label, options = [] } = props;
  const [field, meta, helpers] = useField(name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        <Text16Weight500>{label}</Text16Weight500>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={meta.value}
        onChange={handleChange}
      >
        {options?.map(({ value, label }: { value: string; label: string }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
      <CommonErrorText14Weight500>
        {meta.touched && meta.error}
      </CommonErrorText14Weight500>
    </FormControl>
  );
};

export default RadioGroupFormik;
