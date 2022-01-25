import {
  CalculatedDeviceValues,
  calculateProductivityPercentage,
  getCalculatedValuesForDevice,
  progressbarCalcByPercentage,
  randomPercentageCalculation
} from "../overview_services";
import {Device} from "../../../_common/models/device";

describe("overview service testing", () => {

  const performance = [10, 20, 30, 35, 12, 34, 34, 45];

  it("returns random element from array", () => {
    expect(performance).toContain(randomPercentageCalculation(performance));
  });

  it("returns percentage value of maximum width 200", () => {
    expect(progressbarCalcByPercentage(50)).toEqual(100);
  });

  describe("calculateProductivityPercentage", () => {
    it("calculates the percentage - target is 100", () => {
      const result = calculateProductivityPercentage(100, 100);
      expect(result).toBe(100);
    });

    it("calculates the percentage - target is 0", () => {
      const result = calculateProductivityPercentage(100, 0);
      expect(result).toBe(0);
    });

    it("calculates the percentage - current is NaN", () => {
      const result = calculateProductivityPercentage(NaN, 100);
      expect(result).toBe(0);
    });

    it("calculates the percentage - target is NaN", () => {
      const result = calculateProductivityPercentage(100, NaN);
      expect(result).toBe(0);
    });
  });

  describe("getCalculatedValuesForDevice", () => {
    it("calculated with all available data", () => {
      const device: Device = {
        type: "devices",
        id: 4711,
        attributes: {
          settings: {
            targetOutput: {
              data: 100,
              unit: "m/h",
            },
            targetSpeed: {
              data: 4000,
              unit: "rpm",
            },
            targetPerformance: {
              data: 100,
              unit: "%",
            }
          },
          performanceData: {
            maxOutput: {
              data: 100,
              unit: "m/h",
            },
            maxSpeed: {
              data: 4000,
              unit: "rpm"
            },
          }
        },
        relationships: {
          measurements: {
            data: [
              {
                type: "measurements",
                id: "1",
                attributes: {
                  deviceId: 4711,
                  type: "output",
                  data: 100,
                  unit: "m/h",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "2",
                attributes: {
                  deviceId: 4711,
                  type: "speed",
                  data: 4000,
                  unit: "rpm",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "3",
                attributes: {
                  deviceId: 4711,
                  type: "output",
                  data: 80,
                  unit: "m/h",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "4",
                attributes: {
                  deviceId: 4711,
                  type: "speed",
                  data: 3500,
                  unit: "rpm",
                  timestamp: new Date().toISOString(),
                }
              },
            ]
          },
          analytics: {
            data: [
              {
                type: "analytics",
                id: "1",
                attributes: {
                  deviceId: 4711,
                  availability: {
                    data: 100,
                    unit: "%"
                  },
                  performance: {
                    data: 100,
                    unit: "%"
                  },
                  timeRange: {
                    start: new Date().toISOString(),
                    end: new Date().toISOString(),
                  }
                },
              },
              {
                type: "analytics",
                id: "2",
                attributes: {
                  deviceId: 4711,
                  availability: {
                    data: 80,
                    unit: "%"
                  },
                  performance: {
                    data: 80,
                    unit: "%"
                  },
                  timeRange: {
                    start: new Date().toISOString(),
                    end: new Date().toISOString(),
                  }
                },
              }
            ]
          }
        }
      };
      const result: CalculatedDeviceValues = getCalculatedValuesForDevice(device);
      expect(result).toEqual({
        currentSpeed: 4000,
        currentOutput: 100,
        currentAvailability: 100,
        currentPerformance: 100,
        maxSpeed: 4000,
        maxOutput: 100,
        targetSpeed: 4000,
        targetOutput: 100,
        targetPerformance: 100,
        speedPercentage: 100,
        outputPercentage: 100,
        speedTargetLevel: 100,
        outputTargetLevel: 100,
      });
    });

    it("calculates with missing analytics", () => {
      const device: Device = {
        type: "devices",
        id: 4711,
        attributes: {
          settings: {
            targetOutput: {
              data: 100,
              unit: "m/h",
            },
            targetSpeed: {
              data: 4000,
              unit: "rpm",
            },
            targetPerformance: {
              data: 100,
              unit: "%",
            }
          },
          performanceData: {
            maxOutput: {
              data: 100,
              unit: "m/h",
            },
            maxSpeed: {
              data: 4000,
              unit: "rpm"
            },
          },
        },
        relationships: {
          measurements: {
            data: [
              {
                type: "measurements",
                id: "1",
                attributes: {
                  deviceId: 4711,
                  type: "output",
                  data: 100,
                  unit: "m/h",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "2",
                attributes: {
                  deviceId: 4711,
                  type: "speed",
                  data: 4000,
                  unit: "rpm",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "3",
                attributes: {
                  deviceId: 4711,
                  type: "output",
                  data: 80,
                  unit: "m/h",
                  timestamp: new Date().toISOString(),
                }
              },
              {
                type: "measurements",
                id: "4",
                attributes: {
                  deviceId: 4711,
                  type: "speed",
                  data: 3500,
                  unit: "rpm",
                  timestamp: new Date().toISOString(),
                }
              },
            ]
          },
        }
      };
      const result: CalculatedDeviceValues = getCalculatedValuesForDevice(device);
      expect(result).toEqual({
        currentSpeed: 4000,
        currentOutput: 100,
        currentAvailability: 0,
        currentPerformance: 0,
        maxSpeed: 4000,
        maxOutput: 100,
        targetSpeed: 4000,
        targetOutput: 100,
        targetPerformance: 100,
        speedPercentage: 100,
        outputPercentage: 100,
        speedTargetLevel: 100,
        outputTargetLevel: 100,
      });
    });

    it("calculates with missing measurements", () => {
      const device: Device = {
        type: "devices",
        id: 4711,
        attributes: {
          settings: {
            targetOutput: {
              data: 100,
              unit: "m/h",
            },
            targetSpeed: {
              data: 4000,
              unit: "rpm",
            },
            targetPerformance: {
              data: 100,
              unit: "%",
            }
          },
          performanceData: {
            maxOutput: {
              data: 100,
              unit: "m/h",
            },
            maxSpeed: {
              data: 4000,
              unit: "rpm"
            },
          }
        },
        relationships: {
          analytics: {
            data: [
              {
                type: "analytics",
                id: "1",
                attributes: {
                  deviceId: 4711,
                  availability: {
                    data: 100,
                    unit: "%"
                  },
                  performance: {
                    data: 100,
                    unit: "%"
                  },
                  timeRange: {
                    start: new Date().toISOString(),
                    end: new Date().toISOString(),
                  }
                },
              },
              {
                type: "analytics",
                id: "2",
                attributes: {
                  deviceId: 4711,
                  availability: {
                    data: 80,
                    unit: "%"
                  },
                  performance: {
                    data: 80,
                    unit: "%"
                  },
                  timeRange: {
                    start: new Date().toISOString(),
                    end: new Date().toISOString(),
                  }
                },
              }
            ]
          }
        }
      };
      const result: CalculatedDeviceValues = getCalculatedValuesForDevice(device);
      expect(result).toEqual({
        currentSpeed: 0,
        currentOutput: 0,
        currentAvailability: 100,
        currentPerformance: 100,
        maxSpeed: 4000,
        maxOutput: 100,
        targetSpeed: 4000,
        targetOutput: 100,
        targetPerformance: 100,
        speedPercentage: 0,
        outputPercentage: 0,
        speedTargetLevel: 100,
        outputTargetLevel: 100,
      });
    });
  });

});
