import axios, { AxiosError } from 'axios';
import HttpStatusCode from 'src/constant/httpStatusCode.enum';

const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

const isAxiosUnprocessableEntityError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export { isAxiosError, isAxiosUnprocessableEntityError };
