import { Stock } from './stock.model';

/**
 * Model for the json data in the sample json file
 */
export interface StockExchange {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
}
