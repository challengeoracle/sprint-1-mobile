import { ControlledInput } from "@/components/ControlledInput";
import { handleLogin } from "@/services/loginService";
import { LoginFormData, loginSchema } from "@/types/loginTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";

const IndexScreen = () => {
    const router = useRouter();

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

    // Função que conecta o formulário ao serviço de login
    const onLoginSubmit = (data: LoginFormData) => {
        handleLogin(data, router);
    };

    return (
        <View className="flex-1 bg-medix-50">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 justify-center items-center px-6 pb-24">
                <Image source={require("../assets/images/medix-logo.png")} className="w-[200px] h-[150px] rounded-full mb-4" />

                <Text className="text-lg text-medix-900 mb-8">Acesse sua conta para continuar</Text>

                <View className="w-full">
                    {/* Input de Email */}
                    <ControlledInput control={control} name="email" label="" placeholder="Email" placeholderTextColor="#7fbfbf" keyboardType="email-address" autoCapitalize="none" error={errors.email} className="bg-medix-200 text-medix-600 px-4 py-3 rounded-lg border border-medix-300 text-base" />

                    {/* Input de Senha  */}
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
            </KeyboardAvoidingView>
        </View>
    );
};

export default IndexScreen;
