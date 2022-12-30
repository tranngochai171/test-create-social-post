import { NextApiRequest, NextApiResponse } from 'next';
import commonConstants from '../../../constants/common.constant';
import socialService from '../../../services/social.service';
import errorHandler from '../../../errors/error-handler';
import helper405 from '../../../helper/helper.405';
import helper200 from '../../../helper/helper.200';
import { HttpStatusCode } from '../../../constants/http-status-code.constant';
import { BaseError } from '../../../errors/base-error';
import { ErrorConstants } from '../../../constants/error.constant';
import { PostDataType } from '../../../types/post.type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case commonConstants.POST:
        const {
          title,
          banner,
          venue,
          capacity,
          price,
          startAt,
          privacy,
          tags,
        } = req.body;
        if (
          !title ||
          !banner ||
          !venue ||
          !capacity ||
          !price ||
          !startAt ||
          !privacy ||
          tags?.length < 1
        ) {
          console.error(
            `Invalid Request (Missing title): ${title} or (Missing banner): ${banner} or (Missing venue): ${venue} or (Missing capacity): ${capacity} or (Missing price): ${price} or (Missing startAt): ${startAt} or (Missing privacy): ${privacy} or (Missing tags): ${tags}`,
          );
          throw new BaseError(
            HttpStatusCode.BAD_REQUEST,
            ErrorConstants.BAD_REQUEST,
          );
        }
        const responseData: PostDataType = await socialService.createNewPost(
          req.body,
        );

        helper200.handle(res, responseData);
        break;
      default:
        // Method Not Allowed
        helper405.handle(res);
        break;
    }
  } catch (error) {
    errorHandler.send(error, res);
  }
}
