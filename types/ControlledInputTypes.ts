import { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";

// Tipagem genérica para garantir compatibilidade com qualquer formulário
type inputControllerProps<T extends FieldValues> = TextInputProps & {
    control: Control<T>;
    name: Path<T>; // Garante que 'name' seja uma chave válida do schema Zod
    label: string;
    error?: FieldError;
    formatValue?: (value: string) => string; // Função opcional para formatar o valor
};

export default inputControllerProps;
