import HeaderProps from "@/types/headerProps";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({
    title,
    onPressLeft,
    onPressRight,
    leftIconName = "menu", // Valor padrão para o ícone esquerdo
    rightIconName = "bell", // Valor padrão para o ícone direito
    iconSize = 24, // Valor padrão para o tamanho do ícone
    iconColor = "#10b981", // Valor padrão para a cor do ícone
    style,
}: HeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[{ paddingTop: insets.top, paddingBottom: 0 }, style]} className="flex flex-row items-center justify-between px-4 border-b border-medix-200">
            {/* Lado Esquerdo: Ícone de Menu */}
            <View className="h-16 w-10 justify-center items-center">
                {onPressLeft && (
                    <TouchableOpacity onPress={onPressLeft} activeOpacity={0.7} className="p-1">
                        {/* Use as props desestruturadas para os ícones */}
                        <Feather name={leftIconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Centro: Título da Tela */}
            <View>
                <Text className="text-xl font-bold text-medix-900" numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* Lado Direito: Ícone de Notificações (ou Perfil) */}
            <View className="h-16 w-10 justify-center items-center">
                {onPressRight && (
                    <TouchableOpacity onPress={onPressRight} activeOpacity={0.7} className="p-1">
                        {/* Use as props desestruturadas para os ícones */}
                        <Feather name={rightIconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Header;
