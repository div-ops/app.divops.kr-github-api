import { API } from "@divops/github-oauth";
import { createCors } from "../../../api";

export default API.of({ name: "app-divops-kr" }).UserInfo({
  before: createCors,
});