import React from 'react';
import { InputBase, styled } from '@mui/material';
import { themes } from '../../theme';
import { Field } from 'formik';
import { FieldProps } from 'formik/dist/Field';
import { Stack } from '@mui/material';
import {
  CommonErrorText14Weight500,
  Text14Weight500,
} from '../common/styled/typography-styed';
import TextareaAutosize from '@mui/base/TextareaAutosize';

type StyledInputProps = {
  isError?: boolean;
};

const StyledTitleInput = styled(InputBase, {
  shouldForwardProp: prop => prop !== 'isError',
})<StyledInputProps>(({ isError }) => ({
  '& .MuiInputBase-input': {
    backgroundColor: themes.light.colorRoyalHeath,
    color: themes.light.colorWhite,
    height: '60px',
    padding: '0 12px',
    borderRadius: '4px',
    fontSize: '48px',
    fontWeight: 600,
    fontFamily: themes.light.fontNeueHaasGroteskDisplayPro,
    borderBottom: isError ? `2px solid ${themes.light.colorElectricRed}` : '',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: '10px 12px',
  },
}));

const StyledInput = styled(InputBase, {
  shouldForwardProp: prop => prop !== 'isError',
})<StyledInputProps>(({ isError }) => ({
  '& .MuiSvgIcon-root': {
    marginRight: 10,
    color: themes.light.colorChathamsBlue,
  },
  '& .MuiInputBase-input': {
    backgroundColor: themes.light.colorWhite,
    height: '40px',
    padding: '0 12px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: themes.light.fontNeueHaasGroteskDisplayPro,
    border: isError ? `2px solid ${themes.light.colorElectricRed}` : '',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: '10px 12px',
    borderRadius: '8px',
  },
}));

const Input = (props: any) => {
  const {
    isTitle,
    name,
    label,
    maxLength,
    width = 200,
    icon,
    title,
    ...rest
  } = props;
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        if (isTitle) {
          return (
            <Stack width={width} gap={1}>
              <TextareaAutosize
                {...field}
                maxRows={5}
                style={{
                  resize: 'none',
                  backgroundColor: themes.light.colorRoyalHeath,
                  color: themes.light.colorWhite,
                  minHeight: '60px',
                  padding: '0 12px',
                  borderRadius: '4px',
                  fontSize: '48px',
                  fontWeight: 600,
                  fontFamily: themes.light.fontNeueHaasGroteskDisplayPro,
                  borderBottom: Boolean(meta.error)
                    ? `2px solid ${themes.light.colorElectricRed}`
                    : '',
                }}
              />
              <Stack direction='row' justifyContent='flex-end'>
                <CommonErrorText14Weight500>
                  {meta.touched && meta.error}
                </CommonErrorText14Weight500>
              </Stack>
            </Stack>
          );
        }
        return (
          <Stack width={width} gap={1}>
            {title ? <Text14Weight500>{title}</Text14Weight500> : null}
            <StyledInput
              {...field}
              isError={Boolean(meta.error)}
              inputProps={{
                maxLength,
              }}
              startAdornment={icon ? icon : null}
              {...rest}
            />
            <Stack direction='row' justifyContent='flex-end'>
              <CommonErrorText14Weight500>
                {meta.touched && meta.error}
              </CommonErrorText14Weight500>
            </Stack>
          </Stack>
        );
      }}
    </Field>
  );
};

export default Input;
