import {IQuote} from "./IQuote"
import {Quote} from "../../domain/Entities/Quote"

export interface IQuoteRepository {
  create(payload: IQuote): Promise<Quote>;
  findByPk(pk: number): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  delete(pk: number): Promise<boolean>;
}