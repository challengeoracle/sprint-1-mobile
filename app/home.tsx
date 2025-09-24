import { Link } from "expo-router";
import { Text, View } from "react-native";

const Home = () => {
    return (
        <View className="flex-1 bg-medix-100 items-center justify-center px-6 gap-8">
            <Text className="text-4xl font-bold text-medix-600 mb-2">👋 Olá!</Text>
            <Text className="text-lg text-medix-700 mb-1">Você está logado com sucesso.</Text>
            <Text className="text-sm text-medix-800 mb-8">Aproveite sua experiência no app 💚</Text>

            <Link replace href="/" className="bg-medix-600 px-6 py-3 rounded-lg">
                <Text className="text-white text-base font-semibold">Sair</Text>
            </Link>
        </View>
    );
};

export default Home;
