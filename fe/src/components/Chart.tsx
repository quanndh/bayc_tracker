import { useEffect, useMemo, useState } from "react";
import { request } from "../shared/utils/request";
import { Env } from "../constants/env";
import moment from "moment";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart as ChartComponent } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  zoomPlugin
);

const Chart = () => {
  const [data, setData] = useState<Array<any>>([]);

  const getChartData = async () => {
    const res = await request.get(`${Env.apiUrl}/api/txs/chart`);
    setData(res.data);
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        min: moment(data[data.length - 30].day).format("DD MMM YY"),
        max: moment(data[data.length - 1].day).format("DD MMM YY"),
      },
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x" as const,
        },
        zoom: {
          pinch: {
            enabled: true, // Enable pinch zooming
          },
          wheel: {
            enabled: true, // Enable wheel zooming
          },
          mode: "x" as const,
        },
      },
    },
  };

  useEffect(() => {
    getChartData();
  }, []);

  const chartData = useMemo(() => {
    const labels = data.map((item: any) =>
      moment(item.day).format("DD MMM YY")
    );
    const datasets = [
      {
        type: "line" as const,
        label: "Average Price (ETH)",
        backgroundColor: "rgb(75, 192, 192)",
        data: labels.map((_, index) => data[index].average),
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y1",
        borderJoinStyle: "bevel" as const,
      },
      {
        type: "bar" as const,
        label: "Volume (ETH)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        data: labels.map((_, index) => data[index].volume),
        yAxisID: "y",
      },
    ];
    return {
      labels,
      datasets,
    };
  }, [data]);

  return <ChartComponent type="bar" options={options} data={chartData} />;

  // const config = {
  //   data: [data, data],
  //   xField: "day",
  //   yField: ["volume", "average"],
  //   theme: "dark",
  //   limitInPlot: false,
  //   padding: [10, 20, 80, 30],
  //   // 需要设置底部 padding 值，同 css
  //   slider: {},
  //   meta: {
  //     time: {
  //       sync: false, // 开启之后 slider 无法重绘
  //     },
  //   },
  //   geometryOptions: [
  //     {
  //       geometry: "column",
  //     },
  //     {
  //       geometry: "line",
  //     },
  //   ],
  //   legend: [
  //     {
  //       position: "bottom",
  //     },
  //   ],
  // };
  // return <DualAxes {...config} />;
};

export default Chart;
