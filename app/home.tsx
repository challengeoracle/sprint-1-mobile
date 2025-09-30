import { Link, router } from "expo-router";
import { Text, View, SafeAreaView } from "react-native";
import Header from "./components/header"; 

const Home = () => {

    // ícone da esquerda (menu)
    const handleOpenDrawer = () => {
        console.log('Ação para abrir o menu lateral (Drawer Navigation)');
        
    };

    
    const handleNotifications = () => {
        console.log('Navegar para a tela de notificações');
        // usando o exporouter, vamos alterar o caminho para quando criar a page de notifications, como usar a baixo:
        //router.push('/notifications');
    };

    return (
        // SafeAreaView serve para que nada fique em cima da barra de status do iOS
        <SafeAreaView className="flex-1 bg-medix-50">
            
            <View className="flex-1 bg-medix-100"> {/* manter essa cor de fundo, para destacar o header */}
                <Header 
                    title="Home"
                    onPressLeft={handleOpenDrawer}
                    onPressRight={handleNotifications}
                />

                
                
                <View className="flex-1 items-center justify-center px-6 gap-8"> {/* FLEX 1 sempre */}
                    <Text className="text-4xl font-bold text-medix-600 mb-2">👋 Olá!</Text>
                    <Text className="text-lg text-medix-700 mb-1">Você está logado com sucesso.</Text>
                    <Text className="text-sm text-medix-800 mb-8">Aproveite sua experiência no app 💚</Text>

                    <Link replace href="/" className="bg-medix-600 px-6 py-3 rounded-lg">
                        <Text className="text-white text-base font-semibold">Sair</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;