const ENV = (process.env.NODE_ENV || "dev").toLowerCase();

export const MOCK_RESULT = (parent, args, context, info) => ({
  config    : {},
  data      : {
    edges     : {
      args   : () => {
        try {
          return JSON.stringify(args);
        } catch (e) {
          return "";
        }
      },
      context: () => {
        try {
          return JSON.stringify(context);
        } catch (e) {
          return "";
        }
      },
      info   : () => {
        try {
          return JSON.stringify(info);
        } catch (e) {
          return "";
        }
      },
      parent : () => {
        try {
          return JSON.stringify(parent);
        } catch (e) {
          return "";
        }
      },
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
