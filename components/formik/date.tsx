import React from 'react';
import { styled, InputBase, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Field } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import { themes } from '../../theme';
import { CommonErrorText14Weight500 } from '../common/styled/typography-styed';
import commonConstants from '../../constants/common.constant';

type StyledInputProps = {
  isError?: boolean;
};

const StyledInput = styled(InputBase, {
  shouldForwardProp: prop => prop !== 'isError',
})<StyledInputProps>(({ isError }) => ({
  '& .MuiSvgIcon-root': {
    marginRight: 10,
    fontSize: 30,
    color: themes.light.colorChathamsBlue,
  },
  '& .MuiInputBase-input': {
    backgroundColor: themes.light.colorWhite,
    height: '40px',
    padding: '0 12px',
    borderRadius: '4px',
    fontSize: '28px',
    fontWeight: 600,
    fontFamily: themes.light.fontNeueHaasGroteskDisplayPro,
    border: isError ? `2px solid ${themes.light.colorElectricRed}` : '',
  },
}));

const Date = (props: any) => {
  const { name, label, width = 300, icon, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <MobileDatePicker
            label={label}
            inputFormat={commonConstants.DATE_FORMATTER.DATE}
            value={field.value}
            onChange={newValue => {
              form.setFieldValue(name, newValue);
            }}
            renderInput={params => (
              <Stack width={width} gap={1}>
                <StyledInput
                  {...params}
                  startAdornment={icon ? icon : null}
                  isError={Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                  {...rest}
                />
                <Stack direction='row' justifyContent='flex-end'>
                  <CommonErrorText14Weight500>
                    {meta.touched && meta.error}
                  </CommonErrorText14Weight500>
                </Stack>
              </Stack>
            )}
          />
        );
      }}
    </Field>
  );
};

export default Date;
