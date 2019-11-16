import { IPageInfo, IResponse } from "../../interfaces/IResponse";

export const PAGE_INFO_RESPONSE: IPageInfo = {
  hasNextPage: expect.any(Boolean),
  hasPrevPage: expect.any(Boolean),
  nextCursor : expect.any(String),
  prevCursor : expect.any(String),
};

export const DEFAULT_LIST_RESPONSE: IResponse = {
  edges     : expect.anything(),
  message   : expect.any(String),
  pageInfo  : PAGE_INFO_RESPONSE,
  totalCount: expect.any(Number),
};
