import Header from "@/components/Header";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const RootLayout = () => {
    const router = useRouter();

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F9F9" />
            <Stack>
                {/* Tela de login (index) */}
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="chatbot"
                    options={{
                        headerShown: true,
                        header: () => <Header title="Medix AI" leftIconName="arrow-left" onPressLeft={() => router.back()} />,
                    }}
                />

                {/* Tela de cadastro de paciente (cadastro) */}
                <Stack.Screen
                    name="cadastro"
                    options={{
                        headerShown: true,
                        header: () => <Header title="Cadastro" leftIconName="arrow-left" onPressLeft={() => router.back()} />, // Usar o router back pra voltar
                    }}
                />

                {/* Tela inicial (home) */}
                <Stack.Screen
                    name="home"
                    options={{
                        headerShown: true,
                        header: () => <Header title="Home" leftIconName="menu" onPressLeft={() => console.log("Ação para abrir o menu lateral")} rightIconName="bell" onPressRight={() => router.push("/notificacoes")} />,
                    }}
                />

                {/* Tela de agendamentos */}
                <Stack.Screen
                    name="agendamento"
                    options={{
                        headerShown: true,
                        header: () => <Header title="Agendar Serviços" leftIconName="arrow-left" onPressLeft={() => router.back()} />,
                    }}
                />

                {/* Tela de notificações */}
                <Stack.Screen
                    name="notificacoes"
                    options={{
                        headerShown: true,
                        header: () => <Header title="Notificações" leftIconName="arrow-left" onPressLeft={() => router.back()} />,
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
};

export default RootLayout;
