import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

const SearchBar = () => {
    return (
        <View className="bg-white flex-row items-center rounded-lg p-3 border border-medix-200 shadow-sm mb-6">
            <Feather name="search" size={20} color="#006666" />
            <TextInput placeholder="Buscar hospitais, exames..." className="flex-1 ml-3 text-base" placeholderTextColor="#7fbfbf" />
        </View>
    );
};

export default SearchBar;
