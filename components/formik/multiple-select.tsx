import { useField } from 'formik';
import React, { useState } from 'react';
import produce from 'immer';
import { Stack, Chip, styled } from '@mui/material';
import {
  CommonErrorText14Weight500,
  Text16Weight400Gray,
  Text16Weight500,
} from '../../components/common/styled/typography-styed';
import { themes } from '../../theme';

const StyledStackWrap = styled(Stack)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
});

const StyledChip = styled(Chip)({
  backgroundColor: themes.light.colorMagnolia,
  color: themes.light.colorBoysenberry,
  '& .MuiSvgIcon-root': {
    color: themes.light.colorBoysenberry,
    '&:hover': {
      color: themes.light.colorBoysenberry,
    },
  },
});

const MultipleSelect = (props: any) => {
  const { name, label, subLabel, originalOptions = [] } = props;
  const [field, meta, helpers] = useField(name);
  const [unselectedOptions, setUnselectedOptions] = useState(
    originalOptions ?? [],
  );

  const handleUnselect = (unselectedItem: string) => {
    const currentValue = produce(meta?.value, (draft: string[]) => {
      draft.filter(item => {
        const index = draft.findIndex(item => item === unselectedItem);
        if (index !== -1) draft.splice(index, 1);
      });
    });
    helpers.setValue(currentValue);
    if (!unselectedOptions.includes(unselectedItem)) {
      setUnselectedOptions((prevState: string[]) => {
        const temp = [...prevState];
        temp.push(unselectedItem);
        return temp;
      });
    }
  };

  const handleSelect = (selectedItem: string) => {
    setUnselectedOptions((prevState: string[]) =>
      prevState.filter(item => item !== selectedItem),
    );
    if (!meta?.value?.includes(selectedItem)) {
      const currentValue = produce(meta?.value, (draft: string[]) => {
        draft.push(selectedItem);
      });
      helpers.setValue(currentValue);
    }
  };

  return (
    <Stack gap={1}>
      {label ? <Text16Weight500>{label}</Text16Weight500> : null}
      {subLabel ? <Text16Weight400Gray>{subLabel}</Text16Weight400Gray> : null}
      <StyledStackWrap>
        {meta?.value?.map((item: string) => (
          <StyledChip
            variant='outlined'
            key={item}
            label={item}
            onDelete={() => handleUnselect(item)}
          />
        ))}
      </StyledStackWrap>
      <StyledStackWrap>
        {unselectedOptions?.map((item: string) => (
          <Chip key={item} label={item} onClick={() => handleSelect(item)} />
        ))}
      </StyledStackWrap>
      <CommonErrorText14Weight500>
        {meta.touched && meta.error}
      </CommonErrorText14Weight500>
    </Stack>
  );
};

export default MultipleSelect;
