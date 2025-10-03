import LoginForm from "@/components/forms/LoginForm"; // Importa o novo componente
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Text, View } from "react-native";

const IndexScreen = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-medix-50">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 justify-center items-center px-6 pb-24">
                <Image source={require("../assets/images/medix-logo.png")} className="w-[200px] h-[150px] rounded-full mb-4" />
                <Text className="text-lg text-medix-900 mb-8">Acesse sua conta para continuar</Text>

                {/* Formulário de login, passa o router para conseguir fazer o redirect com os botões, depois vai acabar mudando porque o cadastro não vai ser aqui */}
                <LoginForm router={router} />
            </KeyboardAvoidingView>
        </View>
    );
};

export default IndexScreen;
