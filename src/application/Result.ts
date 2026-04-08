/**
 * Classe utilitária que implementa o padrão Result (Railway Oriented Programming),
 * encapsulando o retorno de operações que podem ter sucesso ou falha,
 * evitando o uso excessivo de exceções para controle de fluxo.
 *
 * @class Result<T, E>
 *
 * @property ok     - Indica se a operação foi bem-sucedida
 * @property value  - Valor retornado em caso de sucesso (null em falha)
 * @property error  - Erro retornado em caso de falha (null em sucesso)
 * @property status - Código de status HTTP associado ao resultado
 */
export class Result<T = any, E = Error | null> {
  private constructor(
    public readonly ok: boolean,
    public readonly value: T | null,
    public readonly error: E | null,
    public readonly status: number
  ) {}

  /**
   * Cria um Result de sucesso com o valor e status fornecidos.
   *
   * @static
   * @param value - Valor a ser encapsulado
   * @param status - Código de status HTTP (padrão: 200)
   * @returns Instância de Result com ok = true
   */
  static ok<T>(value: T, status: number = 200): Result<T, null> {
    return new Result<T, null>(true, value, null, status);
  }

  /**
   * Cria um Result de falha com o erro e status fornecidos.
   * Caso o erro não seja uma instância de `Error`, será convertido automaticamente.
   *
   * @static
   * @param error - Erro a ser encapsulado
   * @param status - Código de status HTTP (padrão: 400)
   * @returns Instância de Result com ok = false
   */
  static fail<E extends Error | string | any>(
    error: E,
    status: number = 400
  ): Result<null, Error> {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error ?? "Erro não informado"));
    return new Result<null, Error>(false, null, normalizedError, status);
  }

  /**
   * Atalho para criação de um Result de sucesso com status 200.
   * Equivalente a chamar `Result.ok(value)`.
   *
   * @static
   * @param value - Valor a ser encapsulado
   * @returns Instância de Result com ok = true e status 200
   */
  static of<T>(value: T): Result<T, null> {
    return Result.ok(value);
  }

  /**
   * Aplica uma função de transformação ao valor do Result,
   * caso seja um resultado de sucesso. Em caso de falha, retorna o próprio Result
   * sem aplicar a transformação.
   *
   * @param fn - Função de transformação aplicada ao valor
   * @returns Novo Result com o valor transformado, ou o Result de falha original
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (!this.ok) return this as any;
    return Result.ok(fn(this.value!), this.status) as Result<U, E>;
  }

  /**
   * Aplica uma função que retorna um novo Result ao valor atual,
   * caso seja um resultado de sucesso. Útil para encadear operações
   * que também retornam Result, evitando aninhamentos.
   * Em caso de falha, retorna o próprio Result sem aplicar a função.
   *
   * @param fn - Função que recebe o valor e retorna um novo Result
   * @returns Result retornado pela função, ou o Result de falha original
   */
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (!this.ok) return this as any;
    return fn(this.value!);
  }
}
