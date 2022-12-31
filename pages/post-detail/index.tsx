import { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import Layout from '../../components/common/layouts/layout';
import { NextPageWithLayout } from '../_app';
import { PostValuesType } from '../../types/post.type';
import commonConstants from '../../constants/common.constant';
import formatUtil from '../../utils/format.util';
import produce from 'immer';
import { Stack, Box } from '@mui/material';
import {
  CommonTitleText,
  Text16Weight600,
  Text18Weight400,
  Text28Weight600,
} from '../../components/common/styled/typography-styed';
import { StyledBoxBanner } from '../../components/formik/add-banner';
import ImageWithFallback from '../../components/common/image-with-fallback';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { themes } from '../../theme';

type Props = {
  post: PostValuesType;
};

type TextProps = {
  icon?: React.ReactNode;
  text: string;
};

const Text1 = ({ icon, text }: TextProps) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      {icon ? icon : null}
      <Text28Weight600>{text}</Text28Weight600>
    </Stack>
  );
};

const Text2 = ({ icon, text }: TextProps) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      {icon ? icon : null}
      <Text16Weight600>{text}</Text16Weight600>
    </Stack>
  );
};

const colorIcon = themes.light.colorChathamsBlue;
const SizeIconText1 = 32;
const SizeIconText2 = 20;

const styledIconTex1 = { color: colorIcon, fontSize: SizeIconText1 };
const styledIconTex2 = { color: colorIcon, fontSize: SizeIconText2 };

const Page: NextPageWithLayout<any> = (props: Props) => {
  const {
    post: { banner, capacity, description, price, date, time, title, venue },
  } = props;
  console.log('description', description);
  return (
    <Stack>
      <Stack direction='row'>
        <Stack sx={{ flex: '65%', zIndex: 10 }} gap={2} mt={4}>
          <Box>
            <CommonTitleText>{title}</CommonTitleText>
          </Box>
          <Stack direction='row' gap={2}>
            <Text1
              icon={<CalendarTodayIcon style={{ ...styledIconTex1 }} />}
              text={date}
            />
            <Text1
              icon={<AccessTimeFilledIcon style={{ ...styledIconTex1 }} />}
              text={time}
            />
          </Stack>
          <Stack>
            <Text2
              icon={<AccessTimeFilledIcon style={{ ...styledIconTex2 }} />}
              text={venue}
            />
          </Stack>
          <Stack direction='row' gap={3} mb={2}>
            <Text2
              icon={<AccessTimeFilledIcon style={{ ...styledIconTex2 }} />}
              text={`${capacity} people`}
            />
            <Text2
              icon={<AccessTimeFilledIcon style={{ ...styledIconTex2 }} />}
              text={formatUtil.formatCurrency(+price)}
            />
          </Stack>
        </Stack>
        <Stack
          sx={{ flex: '40%', position: 'relative', zIndex: 1, height: 450 }}
        >
          <StyledBoxBanner
            sx={{
              border: 'none',
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'default',
            }}
          >
            <Stack
              direction='row'
              sx={{ height: '100%' }}
              alignItems='center'
              justifyContent='center'
              gap={1}
            >
              <ImageWithFallback
                src={banner}
                alt='banner image'
                width={800}
                height={500}
              />
            </Stack>
          </StyledBoxBanner>
        </Stack>
      </Stack>
      <Stack direction='row' mb={10}>
        <Stack sx={{ flex: '60%' }}>
          <Text18Weight400 sx={{ whiteSpace: 'pre-wrap' }}>
            {description}
          </Text18Weight400>
        </Stack>
        <Stack sx={{ flex: '40%' }}></Stack>
      </Stack>
    </Stack>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  post: PostValuesType | null;
}> = async ({ query }) => {
  let post: PostValuesType | null = null;
  try {
    post = JSON.parse(decodeURIComponent(query.post as string));
    const { date, time } = formatUtil.extractDateAndTimeFromDateString(
      post?.startAt ?? '',
      commonConstants.DATE_FORMATTER.DATE,
      commonConstants.DATE_FORMATTER.TIME,
    );
    post = produce(post, (draft: PostValuesType) => {
      draft.date = date;
      draft.time = time;
    });
  } catch (err) {}
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};

export default Page;
