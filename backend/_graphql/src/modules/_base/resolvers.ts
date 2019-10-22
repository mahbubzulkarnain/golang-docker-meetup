import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { MOCK_RESULT } from "../../utils/response";

export default {
  Mutation: {
    ping: (parent, args, context, info): IResponse => response(MOCK_RESULT(parent, args, context, info)),
  },
  Query   : {
    ping: (parent, args, context, info): IResponse => response(MOCK_RESULT(parent, args, context, info)),
  },
};
