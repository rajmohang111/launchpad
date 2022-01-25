import * as h from "react-hyperscript";
import * as Chart from "chart.js";
import * as moment from "moment";
import {Component} from "react";
import {css, cx} from "emotion";
import {MeasurementGroup} from "../../_common/models/measurements";
import {generateChartDatasets, getDefaultColorsForDevice} from "../services/chart";
import {Device} from "../../_common/models/device";
import {isEqual} from "lodash";
import {
  CalculatedDeviceValues,
  getCalculatedValuesForDevice
} from "../../overview/services/overview_services";

const styles = {
  container: css({
    marginTop: "16px",
    padding: "0px 16px 0px 16px",
  }),
  timeframe: css({
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "center",
  }),
};

export type DetailsChartProps = {
  device: Device,
  measurementGroups: Array<MeasurementGroup>;
  displayMetersPerHour: boolean,
  height: string
};

export class DetailsChart extends Component<DetailsChartProps, {}> {

  now: moment.Moment = moment();
  chart: Chart;
  chartOptions: Chart.ChartOptions = {
    plugins: {},
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    legend: {
      display: false,
    },
    responsive: true,
    showLines: true,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
          time: {
            minUnit: "minute",
          },
          bounds: "data",
          ticks: {
            display: true,
            source: "auto",
            minRotation: 0,
            maxRotation: 0,
          },
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          }
        }
      ]
    }
  };
  chartConfiguration: Chart.ChartConfiguration = {
    type: "line",
    options: this.chartOptions,
    data: {},
  };

  constructor(props: DetailsChartProps) {
    super(props);
    this.updateChartData = this.updateChartData.bind(this);
  }

  componentDidMount() {
    this.chart = new Chart("detailsChart", this.chartConfiguration);
    setTimeout(window.requestAnimationFrame, 2000, () => {
      this.updateChartData(this.props);
    });
  }

  updateChartData({device, displayMetersPerHour, measurementGroups}: DetailsChartProps) {
    if (this.chart && this.chart !== null) {
      const calculatedValues: CalculatedDeviceValues = getCalculatedValuesForDevice(device);
      this.chart.data.datasets = generateChartDatasets(
        calculatedValues,
        measurementGroups,
        displayMetersPerHour,
        getDefaultColorsForDevice(calculatedValues)
      );
      this.chart.update();
    }
  }

  shouldComponentUpdate(nextProps: DetailsChartProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      this.updateChartData(this.props);
    });
  }

  render() {
    return h("div", {className: cx(styles.container, this.props.height)}, [
      h("canvas", {id: "detailsChart"}),
    ]);
  }
}

export default DetailsChart;
