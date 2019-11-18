import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";
import constant from "../../constants";
import { ICategoriesInput} from "./interface";

export default class CategoryAPI extends RESTDataSource {
  public baseURL = process.env.BASE_URL_CATEGORY || "http://localhost:4001";
  private dataLoader = new DataLoader(async (ids: string[]) => {
    const { edges } = await this.get("/", { ids: `'${ids.join("','")}'` });
    return ids.map((id) => edges.find((data) => data.id === id));
  });

  public async getList(
    { limit = 10, offset = 0, ...props }: ICategoriesInput = { limit: constant.limit, offset: constant.offset },
  ) {
    const { edges } = await this.get("/", { limit, offset, ...props });
    return this.dataLoader.loadMany(edges);
  }

  public async getById(id) {
    return this.dataLoader.load(id);
  }

  protected willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }
}
