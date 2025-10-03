import { ControlledInput } from "@/components/ControlledInput";
import { handleCadastro } from "@/services/cadastroService";
import { CadastroFormData, cadastroSchema } from "@/types/cadastroTypes";
import { formatCPF, formatDataNascimento, formatTelefone } from "@/util/auxiliarFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const CadastroForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroFormData>({
        defaultValues: {
            nomeCompleto: "",
            cpf: "",
            email: "",
            senha: "",
            dataNascimento: "",
            telefone: "",
        },
        resolver: zodResolver(cadastroSchema),
    });

    return (
        <View className="gap-4">
            {/* Nome */}
            <ControlledInput control={control} name="nomeCompleto" label="Nome Completo" placeholder="Digite seu nome completo" error={errors.nomeCompleto} />

            {/* CPF */}
            <ControlledInput control={control} name="cpf" label="CPF" placeholder="000.000.000-00" keyboardType="numeric" maxLength={14} error={errors.cpf} formatValue={formatCPF} />

            {/* Email */}
            <ControlledInput control={control} name="email" label="E-mail" placeholder="seuemail@exemplo.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />

            {/* Senha */}
            <ControlledInput control={control} name="senha" label="Senha" placeholder="Crie uma senha segura" secureTextEntry error={errors.senha} />

            {/* Data de nascimento */}
            <ControlledInput control={control} name="dataNascimento" label="Data de Nascimento" placeholder="DD/MM/AAAA" keyboardType="numeric" maxLength={10} error={errors.dataNascimento} formatValue={formatDataNascimento} />

            {/* Telefone */}
            <ControlledInput control={control} name="telefone" label="Telefone" placeholder="(XX) XXXXX-XXXX" keyboardType="phone-pad" maxLength={15} error={errors.telefone} formatValue={formatTelefone} />

            {/* Botão de cadastro */}
            <TouchableOpacity className="bg-medix-600 p-4 rounded-lg mt-4 items-center" activeOpacity={0.8} onPress={handleSubmit(handleCadastro)}>
                <Text className="text-white text-lg font-bold">Confirmar Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroForm;
