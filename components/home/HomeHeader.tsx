import UserData from "@/types/loginTypes";
import { getInitials } from "@/util/auxiliarFunctions";
import { Text, TouchableOpacity, View } from "react-native";

type HomeHeaderProps = {
    user: Partial<UserData>;
};

const HomeHeader = ({ user }: HomeHeaderProps) => {
    return (
        <View className="flex-row justify-between items-center mb-6">
            <View>
                <Text className="text-xl text-medix-700">Bem-vindo(a),</Text>
                <Text className="text-2xl font-bold text-medix-900">{user.nomeCompleto?.split(" ")[0]}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Abrir Perfil")} className="w-12 h-12 bg-medix-600 rounded-full justify-center items-center">
                <Text className="text-white font-bold text-lg">{getInitials(user.nomeCompleto || "")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeHeader;
