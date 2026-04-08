import {IQuote} from "./IQuote"

export interface IQuoteService {
  createQuote(data: IQuote): Promise<any>;
}