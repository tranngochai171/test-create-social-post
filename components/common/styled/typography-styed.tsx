import { Button, styled, Typography } from '@mui/material';
import { themes } from '../../../theme';

// Font Size 18
export const Text18Weight500 = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: themes.light.colorBlack,
});

// Font Size 16
export const Text16Weight400 = styled(Typography)({
  fontWeight: 400,
  fontSize: '16px',
  color: themes.light.colorBlack,
});
export const Text16Weight400Gray = styled(Typography)({
  fontWeight: 400,
  fontSize: '16px',
  color: themes.light.colorGray,
});
export const Text16Weight500 = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: themes.light.colorBlack,
});
export const Text16Weight500Gray = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: themes.light.colorGray,
});

// Font Size 14
export const Text14Weight500 = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  color: themes.light.colorBlack,
});
export const Text14Weight400 = styled(Typography)({
  fontWeight: 400,
  fontSize: '14px',
  color: themes.light.colorBlack,
});
export const Text14Weight500Gray = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  color: themes.light.colorGray,
});
export const Text14Weight400Gray = styled(Typography)({
  fontWeight: 400,
  fontSize: '14px',
  color: themes.light.colorGray,
});

// Font Size 12
export const Text12Weight500Gray = styled(Typography)({
  fontWeight: 500,
  fontSize: '12px',
  color: themes.light.colorGray,
});
export const Text12Weight600 = styled(Typography)({
  fontWeight: 600,
  fontSize: '12px',
  color: themes.light.colorBlack,
});

export const TextButton = styled(Button)({
  display: 'flex',
  textTransform: 'unset',
  fontSize: '1rem',
});

export const CommonTitleText = styled(Text16Weight500)({
  textAlign: 'center',
  fontFamily: themes.light.fontLexendTera,
  letterSpacing: '-0.05em',
  textTransform: 'uppercase',
});

export const CommonSubtext = styled(Typography)({
  textAlign: 'center',
  fontWeight: 400,
  fontSize: '1rem',
  color: themes.light.colorGray,
  textTransform: 'none',
});

export const CommonSubtextLink = styled(CommonSubtext)({
  display: 'inline-block',
  color: themes.light.colorMaximumBlueGreen,
  cursor: 'pointer',
});

export const CommonErrorText16Weight500 = styled(Text16Weight500)({
  color: themes.light.colorElectricRed,
});
export const CommonErrorText14Weight500 = styled(Text14Weight500)({
  color: themes.light.colorElectricRed,
});
