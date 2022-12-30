import { themes } from '../../../theme';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled, Button } from '@mui/material';

export const StyledMainCommonButton = styled(Button)({
  backgroundColor: themes.light.colorGorseYellow,
  color: themes.light.colorRoyalHeath,
  '&:hover': {
    backgroundColor: themes.light.colorGorseYellow,
  },
});

export const StyledSecondCommonButton = styled(Button)({
  backgroundColor: themes.light.colorWhite,
  color: themes.light.colorBlack,
  '&:hover': {
    backgroundColor: themes.light.colorWhite,
  },
});

export const StyledLoadingButton = styled(LoadingButton)({
  backgroundColor: themes.light.colorGorseYellow,
  color: themes.light.colorRoyalHeath,
  '&:hover': {
    backgroundColor: themes.light.colorGorseYellow,
  },
  '&:disabled': {
    backgroundColor: themes.light.backgroundColorDisabled,
    color: themes.light.colorWhite,
  },
});
