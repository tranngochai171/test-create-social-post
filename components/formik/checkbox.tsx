import { useField } from 'formik';
import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Text16Weight500 } from '../common/styled/typography-styed';

const CheckboxFormik = (props: any) => {
  const { name, label, ...rest } = props;
  const [field, meta, helpers] = useField(props.name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.checked);
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={meta?.value}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={<Text16Weight500>{label}</Text16Weight500>}
      />
    </FormGroup>
  );
};

export default CheckboxFormik;
