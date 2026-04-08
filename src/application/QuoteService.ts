import { IAuthorRepository } from "src/domain/Interfaces/IAuthorRepository"
import { IQuoteRepository } from "src/domain/Interfaces/IQuoteRepository"
import {validateRequiredFields} from "../application/utils/fieldsValidations"
import {Result} from "./Result"
import {IQuoteService} from "../domain/Interfaces/IQuoteService"
import { IQuote } from "../domain/Interfaces/IQuote"

const FIELDS_REQUIRE = ['author_id', 'quote']

export class QuoteService implements IQuoteService {
    public constructor(
        public readonly QuoteRepository : IQuoteRepository,
        public readonly AuthorRepository : IAuthorRepository,
    ){}

    async createQuote(data: IQuote): Promise<Result>{
        try{
            const validationErro = validateRequiredFields(data, FIELDS_REQUIRE)
            if(validationErro){
                return Result.fail(validationErro) 
            }
            
            // Validação de negócio
            const author = this.AuthorRepository.findByPk(data.author_id)
            if(!author){
                return Result.fail("Autor não encontrado", 404);
            }

            const newQuote = await this.QuoteRepository.create(data)
            
            return Result.ok(newQuote, 201)
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Erro ao processar criação de uma nova citação ", error.message)
            return Result.fail(error, 500)
        }
        
    }

    async getAll(){
        try{
            const allQuotes = await this.QuoteRepository.findAll()
            return Result.ok(allQuotes, 200)
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Erro ao resgatar todos as sitações ", error.message)
            return Result.fail(error, 500)
        }
    }

}