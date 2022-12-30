import axiosHelper from '../helper/axios.helper';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { HttpStatusCode } from '../constants/http-status-code.constant';
import { successToast } from '../utils/my-swal';
import { PostValuesType } from '../types/post.type';
import { useRouter } from 'next/router';

export const useCreateNewPost = () => {
  const router = useRouter();
  return useMutation<Response, AxiosError, PostValuesType, () => void>(
    (requestBody: PostValuesType) => {
      return axiosHelper.post('/api/social', requestBody);
    },
    {
      onSuccess: (response: any) => {
        if (response.status === HttpStatusCode.OK) {
          successToast({ title: 'Successfully created a Post!' });
          router.push(
            `/post-detail?post=${encodeURIComponent(
              JSON.stringify(response.data),
            )}`,
          );
        }
      },
    },
  );
};
