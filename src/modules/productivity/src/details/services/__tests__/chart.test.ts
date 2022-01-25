import { ChartDataSets } from "chart.js";
import { MeasurementGroup, MeasurementGroups } from "../../../_common/models/measurements";
import {
  DatasetColorSettings,
  generateChartDatasets,
} from "../chart";
import { createMeasurementGroup, createMeasurementGroups } from "../../../__fixture__/createDeviceData";
import { colors } from "../../../../../../_common/styles/global";
import {CalculatedDeviceValues} from "../../../overview/services/overview_services";

describe("chart_service", () => {

  const calculatedValues: CalculatedDeviceValues = {
    maxOutput: 0,
    maxSpeed: 0,
    targetPerformance: 0,
    currentPerformance: 0,
    currentAvailability: 0,
    targetOutput: 0,
    targetSpeed: 0,
    outputTargetLevel: 0,
    speedTargetLevel: 0,
    outputPercentage: 0,
    speedPercentage: 0,
    currentOutput: 0,
    currentSpeed: 0,
  };
  const dcs: DatasetColorSettings = {
    speed: {
      ok: {
        start: 3000,
        end: Infinity,
        color: colors.teal40,
      },
      warn: {
        start: 2000,
        end: 3000,
        color: colors.pelorous,
      },
      critical: {
        start: 1,
        end: 2000,
        color: colors.radicalRed40,
      },
      zero: {
        start: 0,
        end: 0,
        color: colors.atomic15,
      }
    },
    output: {
      ok: {
        start: 3000,
        end: Infinity,
        color: colors.teal40,
      },
      warn: {
        start: 2000,
        end: 3000,
        color: colors.pelorous,
      },
      critical: {
        start: 1,
        end: 2000,
        color: colors.radicalRed40,
      },
      zero: {
        start: 0,
        end: 0,
        color: colors.atomic15,
      }
    },
  };

  it("should convert the provided measurement groups", () => {
    const mg: Array<MeasurementGroup> = [createMeasurementGroup()];
    const datasets: Array<ChartDataSets> = generateChartDatasets(calculatedValues, mg, true, dcs);
    expect(datasets).toBeTruthy();
    expect(datasets.length).toBe(6);
  });

  it("should convert the provided measurement groups when there are no measurements", () => {
    const mg: Array<MeasurementGroup> = [];
    const datasets: Array<ChartDataSets> = generateChartDatasets(calculatedValues, mg, true, dcs);
    expect(datasets).toBeTruthy();
    expect(datasets.length).toBe(6);
  });

  it("should convert a large list of measurement groups", () => {
    const mg: MeasurementGroups = createMeasurementGroups();
    const dataSets: Array<ChartDataSets> = generateChartDatasets(calculatedValues, mg.data, false, dcs);
    expect(dataSets).toBeTruthy();
    expect(dataSets.length).toBe(6);
    dataSets.map((dataSet: ChartDataSets) => {
      expect(dataSet.label).toMatch(/(rpm|m\/h)/i);
      expect(dataSet.backgroundColor).toBeTruthy();
      expect(dataSet.data).toBeTruthy();
      if (dataSet.data) {
        expect(dataSet.data.length).toBe(1440);
      }
    });
  });
});
