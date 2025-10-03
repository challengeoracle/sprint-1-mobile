import CadastroForm from "@/components/forms/CadastroForm"; // Importa o nosso novo formulário
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

const Cadastro = () => {
    return (
        <View className="flex-1 bg-medix-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="p-6">
                        <Text className="text-2xl font-bold text-medix-800 mb-6">Crie sua conta</Text>

                        {/* Formulário de cadastro */}
                        <CadastroForm />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Cadastro;
