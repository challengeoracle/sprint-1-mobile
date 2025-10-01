import { Feather } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export default interface HeaderProps {
    // Toda página deve ter um título, obrigatoriamente
    title: string;

    // Funções para os botões e ícones
    onPressLeft?: () => void;
    onPressRight?: () => void;
    leftIconName?: FeatherIconName;
    rightIconName?: FeatherIconName;

    // Padrão do tamanho de ícone é 24
    iconSize?: 24 | 32 | 48;
    // Padrão da cor de ícone é '#10b981' (medix-600). */
    iconColor?: string;
    style?: StyleProp<ViewStyle>;
}
