import { ErrorEntity } from '../errors/error.entity';

const APOLOGIZE_MSG = ' We apologize for the inconvenience.';
const TRY_AGAIN_MSG = ' Please try again later.';

export class ErrorConstants {
  // System Error
  static SYSTEM_ERROR = new ErrorEntity(
    1,
    'We have encountered an issue fulfilling your request.' +
      APOLOGIZE_MSG +
      TRY_AGAIN_MSG,
  );
  static BAD_REQUEST = new ErrorEntity(
    2,
    'Something went wrong with the data you submitted. Please check and retry.',
  );

  // Post Errors
  static CREATE_POST_ERROR = new ErrorEntity(
    100,
    'An internal error occurred while Creating A Post.' +
      APOLOGIZE_MSG +
      TRY_AGAIN_MSG,
  );
}
