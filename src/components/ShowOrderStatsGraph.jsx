// components
import Spring from "../components/Spring";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// hooks
import { useTheme } from "../contexts/themeContext";
import { useWindowSize } from "react-use";
import { numFormatter } from "../utils/helpers";

const data = [
  { name: "Jan", Completed: 4000, Uncompleted: 2400 },
  { name: "Feb", Completed: 3000, Uncompleted: 1398 },
  { name: "Mar", Completed: 2000, Uncompleted: 9800 },
  { name: "Apr", Completed: 3450, Uncompleted: 3908 },
  { name: "May", Completed: 8000, Uncompleted: 4800 },
  { name: "Jun", Completed: 2390, Uncompleted: 6800 },
  { name: "Jul", Completed: 1900, Uncompleted: 4300 },
  { name: "Aug", Completed: 8900, Uncompleted: 4500 },
  { name: "Sep", Completed: 5600, Uncompleted: 10000 },
  { name: "Oct", Completed: 6450, Uncompleted: 1200 },
  { name: "Nov", Completed: 7840, Uncompleted: 3000 },
  { name: "Dec", Completed: 3490, Uncompleted: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip p-4">
        <h6 className="mb-1">{label}</h6>
        <div className="flex flex-col">
          {payload.map((item, index) => (
            <div className="flex gap-1.5" key={index}>
              <span className="label-text capitalize">{item.name}:</span>
              <span className="h6 !text-sm">
                {numFormatter(item.value, 1, "")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const ShowOrderStatsGraph = () => {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const revenueColor = theme === "light" ? "var(--header)" : "#C4DEFF";
  const expenseColor = theme === "light" ? "var(--input-border)" : "#8D8D99";

  return (
    <Spring
      className="card flex flex-col  sm:h-[494px] lg:col-span-3 xl:col-span-1"
      style={{ height: "100%" }}
    >
      <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
        <h4>Order Statistics</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: revenueColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Completed Orders
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: expenseColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Uncompleted Orders
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={false}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--input-border)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={9}
              hide={width < 768}
              tick={{
                fontSize: 14,
                fontFamily: "var(--heading-font)",
                fontWeight: 700,
                fill: "var(--header)",
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => numFormatter(value, 0, "")}
              tick={{
                fill: "var(--header)",
              }}
              hide={width < 768}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="Completed"
              fill={revenueColor}
              maxBarSize={16}
              radius={10}
              stackId={"a"}
            />
            <Bar
              dataKey="Uncompleted"
              fill={expenseColor}
              strokeWidth={2}
              stackId={"a"}
              maxBarSize={16}
              radius={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Spring>
  );
};

export default ShowOrderStatsGraph;
