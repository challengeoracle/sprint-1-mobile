import { ControlledInput } from "@/components/ControlledInput";
import { handleCadastro } from "@/services/cadastroService";
import { CadastroFormData, cadastroSchema } from "@/types/cadastroTypes";
import { formatCPF, formatDataNascimento, formatTelefone } from "@/util/formatters";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Cadastro = () => {
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
        <View className="flex-1 bg-medix-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="p-6 gap-4">
                        <Text className="text-2xl font-bold text-medix-800 mb-4">Crie sua conta</Text>

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
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Cadastro;
