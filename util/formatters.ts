// Funções de formatação de texto (máscaras)
export const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const formatDataNascimento = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
};

export const formatTelefone = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length < 3) return `(${cleaned}`;

    // Identifica se é celular (11 dígitos) ou fixo (10 dígitos)
    const isCelular = cleaned.length > 10;

    if (isCelular) {
        return cleaned
            .replace(/(\d{2})/, "($1) ")
            .replace(/(\d{5})/, "$1-")
            .slice(0, 15);
    } else {
        return cleaned
            .replace(/(\d{2})/, "($1) ")
            .replace(/(\d{4})/, "$1-")
            .slice(0, 14);
    }
};
