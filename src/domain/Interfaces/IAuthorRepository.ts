import {IAuthor} from "./IAuthor"
import { Author } from "../Entities/Author";

export interface IAuthorRepository {
  create(payload: IAuthor): Promise<Author>;
  findByPk(pk: number): Promise<Author | null>;
  findAll(): Promise<Author[]>;
  deleteByPk(pk: number): Promise<boolean>;
}