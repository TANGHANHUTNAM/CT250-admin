import { useDynamicTitle } from "../../hooks";

const News = () => {
  useDynamicTitle("Quản lý tin tức");
  return <div className="p-3">News</div>;
};

export default News;
