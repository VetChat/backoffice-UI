import { PageTitleProps } from "./interface/Title";

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <div className="text-3xl font-bold">{children}</div>;
};

export default PageTitle;
