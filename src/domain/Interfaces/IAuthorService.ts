import {Result} from "../../application/Result"

export interface IAuthorService{
    createAuthor(data:object): Promise<Result>;
    deleteAuthor(id: number): Promise<Result>;
    getAllAuthors(): Promise<Result>;
    getById(id:number):Promise<Result>;
}
