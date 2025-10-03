import UserData from "@/types/loginTypes";
import { calculateAge, maskCPF } from "@/util/auxiliarFunctions";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ProfileCardProps = {
    user: Partial<UserData>;
};

const ProfileCard = ({ user }: ProfileCardProps) => {
    const [isCpfVisible, setIsCpfVisible] = useState(false);

    return (
        <View className="mb-8">
            <Text className="text-lg font-bold text-medix-800 mb-4">Meu Perfil</Text>
            <View className="bg-white rounded-lg p-4 shadow-sm">
                <View className="flex-row items-center border-b border-gray-200 pb-3">
                    <Feather name="user" size={20} color="#008080" />
                    <View className="ml-4">
                        <Text className="text-base text-medix-900 font-bold">{user.nomeCompleto}</Text>
                        <Text className="text-sm text-medix-700">{user.email}</Text>
                    </View>
                </View>
                <View className="flex-row justify-around pt-3">
                    <View className="items-center">
                        <Text className="text-sm text-medix-700">Idade</Text>
                        <Text className="text-base font-semibold text-medix-800">{calculateAge(user.dataNascimento || "")}</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-sm text-medix-700">CPF</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-base font-semibold text-medix-800">{isCpfVisible ? user.cpf : maskCPF(user.cpf || "")}</Text>
                            <TouchableOpacity onPress={() => setIsCpfVisible(!isCpfVisible)}>
                                <Feather name={isCpfVisible ? "eye-off" : "eye"} size={20} color="#008080" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProfileCard;
