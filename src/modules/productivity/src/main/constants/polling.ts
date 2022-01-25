import { fromNullable } from "fp-ts/lib/Option";
import { not } from "fp-ts/lib/function";

export const defaultIntervalInSeconds = 60;

const fromSecondsToMilliSeconds = (seconds: number) => seconds * 1000;
export const calculatePollingIntervalInMilliseconds = (interval: string | undefined) => fromNullable(interval)
  .map(JSON.parse)
  .filter(not(isNaN))
  .map(fromSecondsToMilliSeconds)
  .getOrElse(defaultIntervalInSeconds * 1000);

