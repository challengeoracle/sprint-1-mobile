import * as z from "zod";

// Esquema de validação com Zod
export const cadastroSchema = z.object({
    nomeCompleto: z.string().min(1, "O nome completo é obrigatório"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Informe um CPF válido"),
    email: z.email("Informe um e-mail válido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Informe uma data de nascimento válida (DD/MM/AAAA)"),
    telefone: z
        .string()
        .min(1, "O telefone é obrigatório")
        .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Informe um telefone válido"),
});

// Tipo dos dados do formulário de cadastro
export type CadastroFormData = z.infer<typeof cadastroSchema>;
