import type { ReactElement } from 'react';
import Layout from '../../components/common/layouts/layout';
import { NextPageWithLayout } from '../_app';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikControl, {
  CONTROL_TYPE,
} from '../../components/formik/formik-control';
import GroupsIcon from '@mui/icons-material/Groups';
import PlaceIcon from '@mui/icons-material/Place';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Stack, Box } from '@mui/material';
import moment from 'moment';
import NumberFormat from '../../components/common/number-format';
import commonConstants from '../../constants/common.constant';
import {
  SettingBox,
  SettingText,
} from '../../components/create-post/create-post-styled';
import { PostValuesType } from '../../types/post.type';
import { useCreateNewPost } from '../../hooks/usePost';
import { StyledLoadingButton } from '../../components/common/styled/common-styled';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  banner: Yup.string().required('Required'),
  venue: Yup.string().required('Required'),
  capacity: Yup.string()
    .trim()
    .matches(/^[0-9]*[1-9][0-9]*$/, 'Not Valid')
    .required('Required'),
  price: Yup.string()
    .matches(/^[0-9]*[1-9][0-9]*(\.\d{1,2})?$/, 'Not Valid')
    .required('Required!'),
  description: Yup.string().required('Required!'),
  date: Yup.string().required('Required'),
  time: Yup.string().required('Required'),
  isManualApprove: Yup.boolean().optional(),
  privacy: Yup.string().required('Required'),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'At least 1 tag should be selected')
    .required('Required'),
});

const initialValues: PostValuesType = {
  title: 'Untitled Event',
  banner: '',
  venue: '',
  capacity: '',
  price: '',
  date: '',
  description: '',
  time: '',
  isManualApprove: false,
  privacy: '',
  tags: [],
};

const optionsPrivacy = commonConstants.LIST_PRIVACY.map((item: string) => ({
  value: item,
  label: item,
}));

const Page: NextPageWithLayout = () => {
  const { mutate, isLoading } = useCreateNewPost();
  const onSubmit = (values: PostValuesType) => {
    const date = moment(values.date).format(
      commonConstants.DATE_FORMATTER.DATE,
    );
    const time = moment(values.time).format(
      commonConstants.DATE_FORMATTER.TIME,
    );
    const startAt = moment(
      `${date} ${time}`,
      `${commonConstants.DATE_FORMATTER.DATE} ${commonConstants.DATE_FORMATTER.TIME}`,
    ).format();
    mutate({ ...values, startAt });
  };
  const formikProps = { initialValues, validationSchema, onSubmit };
  return (
    <Formik {...formikProps}>
      {({ handleSubmit }) => (
        <Form>
          <Stack>
            <Stack direction='row'>
              <Stack sx={{ flex: '60%', zIndex: 10 }} gap={2}>
                <FormikControl
                  control={CONTROL_TYPE.INPUT}
                  name='title'
                  isTitle
                  width='max-content'
                  fullWidth
                />
                <Stack direction='row' gap={2}>
                  <FormikControl
                    fullWidth
                    control={CONTROL_TYPE.DATE}
                    name='date'
                    placeholder='Date'
                    icon={<CalendarTodayIcon />}
                  />
                  <FormikControl
                    fullWidth
                    control={CONTROL_TYPE.TIME}
                    name='time'
                    placeholder='Time'
                    icon={<AccessTimeFilledIcon />}
                  />
                </Stack>
                <FormikControl
                  autoCapitalize='none'
                  control={CONTROL_TYPE.INPUT}
                  name='venue'
                  placeholder='Venue'
                  icon={<PlaceIcon />}
                  width={516}
                  maxLength={100}
                />
                <Stack direction='row' gap={2}>
                  <FormikControl
                    autoCapitalize='none'
                    control={CONTROL_TYPE.INPUT}
                    name='capacity'
                    placeholder='Max capacity'
                    icon={<GroupsIcon />}
                    maxLength={4}
                  />
                  <FormikControl
                    control={CONTROL_TYPE.INPUT}
                    name='price'
                    placeholder='Cost per person'
                    icon={<MonetizationOnIcon />}
                    inputComponent={NumberFormat as any}
                    maxLength={8}
                  />
                </Stack>
              </Stack>
              <Stack
                sx={{
                  flex: '40%',
                  position: 'relative',
                  height: 441,
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <FormikControl
                    fullWidth
                    control={CONTROL_TYPE.ADD_BANNER}
                    name='banner'
                  />
                </Box>
              </Stack>
            </Stack>
            <Stack direction='row' mb={10}>
              <Stack sx={{ flex: '50%' }} gap={4}>
                <FormikControl
                  title='Description'
                  control={CONTROL_TYPE.INPUT}
                  name='description'
                  placeholder='Description of your event..'
                  multiline
                  minRows={6}
                  width='100%'
                />
                <SettingBox>
                  <SettingText>Settings</SettingText>
                  <FormikControl
                    label='I want to approve attendees'
                    control={CONTROL_TYPE.CHECKBOX}
                    name='isManualApprove'
                  />
                  <FormikControl
                    label='Privacy'
                    control={CONTROL_TYPE.RADIO_GROUP}
                    name='privacy'
                    options={optionsPrivacy ?? []}
                  />
                  <FormikControl
                    label='Tag your social'
                    subLabel='Pick tags for our curation engine to work its magin'
                    control={CONTROL_TYPE.MULTIPLE_SELECT}
                    name='tags'
                    originalOptions={commonConstants.TAGS ?? []}
                  />
                </SettingBox>
                <StyledLoadingButton
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={() => handleSubmit()}
                >
                  CREATE SOCIAL
                </StyledLoadingButton>
              </Stack>
              <Stack sx={{ flex: '50%' }}></Stack>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
