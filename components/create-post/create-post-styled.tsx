import { Stack, styled, Typography } from '@mui/material';
import { themes } from '../../theme';

export const SettingBox = styled(Stack)({
  padding: 32,
  backgroundColor: themes.light.backgroundColorWhite,
  borderRadius: 20,
  gap: 10,
});

export const SettingText = styled(Typography)({
  color: themes.light.colorRoyalHeath,
  fontSize: 32,
  fontWeight: 700,
  fontFamily: themes.light.fontNeueHaasGroteskDisplayPro,
  backgroundColor: themes.light.colorGorseYellow,
  width: 'max-content',
  padding: '8px 12px',
});
