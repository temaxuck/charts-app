import { ParseError } from "./exceptions";

export class ChartData {
  value: number;
  max: number;

  constructor(value: number, max: number) {
    this.value = value;
    this.max = max;
  }

  static fromJSON(json: any): ChartData {
    if (!!json.value && !!json.max) {
      return new ChartData(json.value, json.max);
    } else {
      throw new ParseError(`Couldn't parse API response: ${json}`);
    }
  }
}