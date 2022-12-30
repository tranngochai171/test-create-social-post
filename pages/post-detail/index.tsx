import { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import Layout from '../../components/common/layouts/layout';
import { NextPageWithLayout } from '../_app';
import { PostValuesType } from '../../types/post.type';
import commonConstants from '../../constants/common.constant';
import formatUtil from '../../utils/format.util';
import produce from 'immer';

type Props = {
  post: PostValuesType;
};

const Page: NextPageWithLayout<any> = (props: Props) => {
  const {
    post: {
      banner,
      capacity,
      description,
      isManualApprove,
      price,
      privacy,
      tags,
      date,
      time,
      title,
      venue,
    },
  } = props;
  return (
    <>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </>
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
