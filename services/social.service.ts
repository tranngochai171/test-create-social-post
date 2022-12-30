import { ErrorConstants } from '../constants/error.constant';
import { HttpStatusCode } from '../constants/http-status-code.constant';
import { BaseError } from '../errors/base-error';
import promiseHelper from '../helper/promise.helper';
import { PostValuesType } from '../types/post.type';
import backendAPIClient from '../utils/backend-api.util';

class SocialService {
  async createNewPost(requestBody: PostValuesType): Promise<PostValuesType> {
    try {
      const [response, error] = await promiseHelper.handlePromise(
        backendAPIClient.post('/social', requestBody),
      );
      if (error) {
        throw new BaseError(
          HttpStatusCode.BAD_REQUEST,
          ErrorConstants.CREATE_POST_ERROR,
        );
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SocialService();
