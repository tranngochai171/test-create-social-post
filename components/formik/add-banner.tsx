import React, { useState } from 'react';
import { useField } from 'formik';
import {
  Box,
  styled,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
} from '@mui/material';
import { themes } from '../../theme';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledMainCommonButton,
  StyledSecondCommonButton,
} from '../common/styled/common-styled';
import ImageWithFallback from '../common/image-with-fallback';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const LIST_IMAGE = [
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg',
];

const TextAddBanner = styled(Typography)({
  color: themes.light.colorChathamsBlue,
  fontWeight: 600,
  fontSize: 20,
});

const BoxImages = styled(Stack)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 14,
});

type StyledBoxImageProps = {
  isSelected?: boolean;
};

const BoxImage = styled(Box, {
  shouldForwardProp: prop => prop !== 'isSelected',
})<StyledBoxImageProps>(({ isSelected }) => ({
  height: 170,
  width: 220,
  cursor: 'pointer',
  border: isSelected ? `2px solid ${themes.light.colorRoyalHeath}` : '',
  padding: '2px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

type StyledBoxProps = {
  isError?: boolean;
};

export const StyledBoxBanner = styled(Box, {
  shouldForwardProp: prop => prop !== 'isError',
})<StyledBoxProps>(({ isError }) => ({
  overflow: 'hidden',
  width: 739,
  height: 445,
  background: 'rgba(242, 242, 242, 0.1)',
  border: `2px dashed ${
    isError ? themes.light.colorElectricRed : themes.light.colorPorcelain
  }`,
  borderRadius: '0px 64px',
  borderLength: '20px',
  cursor: 'pointer',
}));

const AddBanner = (props: any) => {
  const { name, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [field, meta, helpers] = useField(props.name);
  const [selectedBanner, setSelectedBanner] = useState(meta?.value ?? '');
  const handleSaveBanner = () => {
    helpers.setValue(selectedBanner);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledBoxBanner onClick={handleClickOpen} isError={Boolean(meta.error)}>
        <Stack
          direction='row'
          sx={{ height: '100%' }}
          alignItems='center'
          justifyContent='center'
          gap={1}
        >
          {!!meta?.value ? (
            <ImageWithFallback
              src={meta?.value}
              alt='banner image'
              width={800}
              height={500}
            />
          ) : (
            <>
              <InsertPhotoIcon
                style={{ color: themes.light.colorChathamsBlue, fontSize: 30 }}
              />
              <TextAddBanner>Add a banner</TextAddBanner>
            </>
          )}
        </Stack>
      </StyledBoxBanner>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='lg'
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Choose a banner
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <BoxImages>
            {LIST_IMAGE.map(image => (
              <BoxImage
                isSelected={image === selectedBanner}
                key={image}
                onClick={() => setSelectedBanner(image)}
              >
                <ImageWithFallback
                  src={image}
                  isStatic={true}
                  alt='banner image'
                  width={200}
                  height={150}
                  priority
                />
              </BoxImage>
            ))}
          </BoxImages>
        </DialogContent>
        <DialogActions>
          <StyledSecondCommonButton autoFocus onClick={handleClose}>
            Close
          </StyledSecondCommonButton>
          <StyledMainCommonButton autoFocus onClick={handleSaveBanner}>
            Save
          </StyledMainCommonButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default React.memo(AddBanner);
