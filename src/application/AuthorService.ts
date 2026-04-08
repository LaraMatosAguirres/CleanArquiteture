import {validateRequiredFields} from "./utils/fieldsValidations"
import {Result} from "./Result"
import {IAuthorService} from "../domain/Interfaces/IAuthorService"
import {IAuthorRepository} from "../domain/Interfaces/IAuthorRepository"
import {IAuthor} from "../domain/Interfaces/IAuthor"

const CREATION_REQUIRE_FIELDS: string[] = ['name']

export class AuthorService implements IAuthorService {
    public constructor(
        public readonly AuthorRepository:IAuthorRepository
    ){}

    async createAuthor(data:IAuthor): Promise<Result>{
        try{
            // Validação de campos obrigatórios
            const validationErro = validateRequiredFields(data, CREATION_REQUIRE_FIELDS)
            if (validationErro){
                return Result.fail(validationErro)
            }

            // Regra de negócios
            if(data.name.length > 100){
                return Result.fail("Nome deve ter menos de 100 caracters")
            }

            // Construção de payload
            const payload:IAuthor = {
                name: data.name
            }

            const newAuthor = await this.AuthorRepository.create(payload)
            return Result.ok(newAuthor, 201)
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Erro ao processar criação de novo autor. ", error.message)
            return Result.fail(error, 500)
        }
    }

    async deleteAuthor(id:number): Promise<Result>{
        try{
            if(!id || !(typeof id == "number")){
                return Result.fail("Id não informado ou não em formato numérico")
            }
            const wasUserDeleted = await this.AuthorRepository.deleteByPk(id)
            if(!wasUserDeleted){
                return Result.fail("Nenhum autor foi removido do sistema!", 401)
            }
            return Result.ok(null)

        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Erro excluir autor do sistema. ", error.message)
            return Result.fail(error, 500) 
        }
    }

    async getAllAuthors(): Promise<Result> {
        try{
            const allAuthors = await this.AuthorRepository.findAll()
            return Result.ok(allAuthors, 200)
        }catch(err){
            const error = err instanceof Error ? err : Error(String(err))
            console.error("Erro ao tentar retornar todos os autores", error.message)
            return Result.fail(error, 500)
        }
    }

    async getById(id:number): Promise<Result>{
        try{
            const author = await this.AuthorRepository.findByPk(id)

            if(!author){
                return Result.fail("Autor não encontrado", 404)
            }
            return Result.ok(author, 200)
        }catch(err){
            const error = err instanceof Error ? err : Error(String(err))
            console.error(`Erro ao tentar retornar autor de id ${id}`, error.message)
            return Result.fail(error, 500)
        }  
    }
}
