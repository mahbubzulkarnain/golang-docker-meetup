const ENV = (process.env.NODE_ENV || "dev").toLowerCase();

export const MOCK_RESULT = (parent, args, context, info) => ({
  config    : {},
  data      : {
    edges     : {
      args   : JSON.stringify(args),
      context: JSON.stringify(context),
      info   : JSON.stringify(info),
      parent : JSON.stringify(parent),
    },
    message   : `Server has been started, with stage ${ENV}.`,
    pageInfo  : {
      hasNextPage: false,
      hasPrevPage: false,
      nextCursor : "",
      prevCursor : "",
    },
    totalCount: 0,
  },
  headers   : {},
  status    : 200,
  statusText: "200",
});
