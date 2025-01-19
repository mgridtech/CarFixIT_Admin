// components
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
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
                  {item.value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "SAR",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  const SalesStats = () => {
    const revenueColor = "#C4DEFF"; // Static color
  
    // Static Graph Data
    const Graphdata = [
      { name: "Jan", revenue: 12000 },
      { name: "Feb", revenue: 15000 },
      { name: "Mar", revenue: 18000 },
      { name: "Apr", revenue: 20000 },
      { name: "May", revenue: 25000 },
      { name: "Jun", revenue: 30000 },
      { name: "Jul", revenue: 27000 },
      { name: "Aug", revenue: 22000 },
      { name: "Sep", revenue: 19000 },
      { name: "Oct", revenue: 23000 },
      { name: "Nov", revenue: 28000 },
      { name: "Dec", revenue: 35000 },
    ];
  
    return (
      <div className="card flex flex-col sm:h-[494px] lg:col-span-3 xl:col-span-1" style={{ height: "100%" }}>
        <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
          <h4>Sales Statistic</h4>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-full"
                style={{ background: revenueColor }}
              />
              <span className="font-heading font-semibold text-sm text-header">
                Revenue
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Graphdata} margin={false}>
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
                tick={{
                  fill: "var(--header)",
                }}
              />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                fill={revenueColor}
                maxBarSize={16}
                radius={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default SalesStats;
  