import useDynamicTitle from "../../hooks/useDynamicTitle";
import ChartIncomeToCategoryLevel1 from "./ChartIncomeToCategoryLevel1";
import ChartIncomeToMonth from "./ChartIncomeToMonth";
import ChartInComeToSubcategory from "./ChartInComeToSubcategory";
import DashboardList from "./DashboardList";

const Statistical = () => {
  useDynamicTitle("Thống kê");
  return (
    <div className="min-h-screen bg-[#F5F7FA] pr-3 pt-4">
      <DashboardList />
      <div className="mt-4 grid min-h-full w-full grid-cols-1 gap-3.5">
        <ChartIncomeToMonth />
        <div className="flex w-full gap-3">
          <ChartIncomeToCategoryLevel1 />
          <ChartInComeToSubcategory />
        </div>
      </div>
    </div>
  );
};
export default Statistical;
