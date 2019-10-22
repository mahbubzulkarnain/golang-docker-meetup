import { response } from "graphql-response-parser";
import db from "./utils/db";

const TableName = "Tags";

const queryGenerator = (query) => `
  select
    (
      select array_to_json(array_agg(e))
      from (
        ${query}
      ) e
    ) "result",
    (
      select count(id) from "${TableName}" e
    ) "totalCount"
`;

export default async ({ query: { ids, limit = 10, offset = 0, ...props } }, res, next) => {
  try {
    const [[{ result, totalCount }]] = await db.query(queryGenerator(
      ids && ids.length
        ? `select * from "${TableName}" where id in (${ids})`
        : `select id from "${TableName}" ${condition(props)} LIMIT ${limit} OFFSET ${offset}`,
    ));
    res.json(
      response(
        ids ? result || [] : (result && result.length ? result.map(({ id }) => id) : []),
        { limit, offset, totalCount },
      ),
    );
  } catch (e) {
    next(e);
  }
};

function condition(props) {
  if (props && Object.keys(props).length) {
    return `WHERE ${Object.keys(props).map((key) => `"${key}"=$$${props[key]}$$`).join(" AND ")}`;
  }
  return "";
}
