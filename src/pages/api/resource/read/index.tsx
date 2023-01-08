import { API } from "@divops/github-oauth";
import { createCors } from "../../../../api/index";

export default API.of({ name: "app-divops-kr" }).ReadResource({
  before: createCors,
});
