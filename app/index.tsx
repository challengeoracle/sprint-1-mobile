import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

const loginSchema = z.object({
    email: z.email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

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

    async function onSubmit({ email, password }: LoginFormData) {
        const plainUsers = await AsyncStorage.getItem("@usersDB");
        const users = JSON.parse(plainUsers || "[]");

        const user = users.find((item: LoginFormData) => item.email === email && item.password === password);

        if (user) {
            router.replace("/home");
        } else {
            Alert.alert("Usuário ou senha inválidos");
        }
    }

    async function onSignUp(data: LoginFormData) {
        const plainUsers = await AsyncStorage.getItem("@usersDB");
        const users = JSON.parse(plainUsers || "[]");
        const newUsers = [...users, data];
        await AsyncStorage.setItem("@usersDB", JSON.stringify(newUsers));
        Alert.alert("Cadastro realizado com sucesso!");
    }

    return (
        <SafeAreaView className="flex-1 bg-medix-50 ">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 justify-center items-center px-6 pb-24">
                <Image source={require("../assets/images/medix-logo.png")} className="w-[200px] h-[150px] rounded-full mb-4" />

                <Text className="text-lg text-medix-900 mb-8">Acesse sua conta para continuar</Text>

                <View className="w-full gap-4">
                    {/* Email */}
                    <Controller name="email" control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput className="bg-medix-200 text-medix-600 px-4 py-3 rounded-lg border border-medix-300 text-base" placeholder="Email" placeholderTextColor="#7fbfbf" onChangeText={onChange} onBlur={onBlur} value={value} keyboardType="email-address" autoCapitalize="none" />} />
                    {errors.email && <Text className="text-medix-error text-sm mt-[-8px]">{errors.email.message}</Text>}

                    {/* Senha */}
                    <Controller name="password" control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput className="bg-medix-200 text-medix-600 px-4 py-3 rounded-lg border border-medix-300 text-base" placeholder="Senha" placeholderTextColor="#7fbfbf" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />} />
                    {errors.password && <Text className="text-medix-error text-sm mt-[-8px]">{errors.password.message}</Text>}

                    {/* Botões */}
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8} className="bg-medix-600 py-3 rounded-lg items-center mt-2">
                        <Text className="text-white text-base font-semibold">Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit(onSignUp)} activeOpacity={0.8} className="bg-medix-500 py-3 rounded-lg items-center mt-2">
                        <Text className="text-white text-base font-semibold">Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default IndexScreen;
