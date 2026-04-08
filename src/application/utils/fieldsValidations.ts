/**
 * Valida se todos os campos obrigatórios estão presentes
 * @param {object} body - Objeto com dados
 * @param {list} REQUIRED_FIELDS - Lista como todos os campos obrigatórios
 * @returns {string|null} - Retorna mensagem de erro ou null se válido
 */
export function validateRequiredFields(
    body: Record<string, any>, 
    REQUIRED_FIELDS: string[]
): string | null {
    const missingFields = REQUIRED_FIELDS.filter(field => !(field in body) || !body[field])
    if (missingFields.length > 0) {
        return `Campos obrigatórios não preenchidos: ${missingFields.join(", ")}`
    }
    return null
}
