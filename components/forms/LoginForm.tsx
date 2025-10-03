import { ControlledInput } from "@/components/ControlledInput";
import { handleLogin } from "@/services/loginService";
import { LoginFormProps } from "@/types/forms/LoginFormProps";
import { LoginFormData, loginSchema } from "@/types/loginTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const LoginForm = ({ router }: LoginFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const onLoginSubmit = (data: LoginFormData) => {
        handleLogin(data, router);
    };

    return (
        <View className="w-full">
            {/* Input de Email */}
            <ControlledInput control={control} name="email" label="" placeholder="Email" placeholderTextColor="#7fbfbf" keyboardType="email-address" autoCapitalize="none" error={errors.email} className="bg-medix-200 text-medix-600 px-4 py-3 rounded-lg border border-medix-300 text-base" />

            {/* Separador para o próximo input */}
            <View className="h-3" />

            {/* Input de Senha */}
            <ControlledInput control={control} name="password" label="" placeholder="Senha" placeholderTextColor="#7fbfbf" secureTextEntry error={errors.password} className="bg-medix-200 text-medix-600 px-4 py-3 rounded-lg border border-medix-300 text-base" />

            {/* Botão de Entrar */}
            <TouchableOpacity onPress={handleSubmit(onLoginSubmit)} activeOpacity={0.8} className="bg-medix-600 py-3 rounded-lg items-center mt-6">
                <Text className="text-white text-base font-semibold">Entrar</Text>
            </TouchableOpacity>

            {/* Botão de Cadastrar */}
            <TouchableOpacity onPress={() => router.push("/cadastro")} activeOpacity={0.8} className="bg-medix-500 py-3 rounded-lg items-center mt-3">
                <Text className="text-white text-base font-semibold">Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
