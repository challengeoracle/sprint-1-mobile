import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Para uma tipagem mais forte, extraímos os nomes de ícones disponíveis no Feather.
// Isso garante que você não passará um nome de ícone que não existe, e o editor dará autocomplete.
type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface HeaderProps {
    /** título obrigatório. */
    title: string;
   
    onPressLeft?: () => void;
    
    
    onPressRight?: () => void;

    leftIconName?: FeatherIconName;
    
   
    rightIconName?: FeatherIconName;
    
    /** Tamanho dos icons padrao 24. */
    iconSize?: number;
    
    /** Cor padrão dos icons '#10b981' ( medix-600). */
    iconColor?: string;
    
   
    style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({
    title,
    onPressLeft,
    onPressRight,
    leftIconName = 'menu',
    rightIconName = 'bell',
    iconSize = 24,
    iconColor = '#10b981', // 'text-medix-600'
    style,
}) => {
    return (
        <View 
            className="flex-row items-center justify-between h-16 bg-medix-50 px-4 border-b border-medix-200"
            style={style}
        >
            {/* Lado Esquerdo: Ícone de Menu  */}
            
            <View className="w-10 h-10 justify-center items-center">
                {onPressLeft && (
                    <TouchableOpacity
                        onPress={onPressLeft}
                        activeOpacity={0.7}
                        className="p-1"
                    >
                        <Feather name={leftIconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Centro: Título da Tela */}
            {/* A view com posicionamento absoluto garante a centralização perfeita */}
            <View className="absolute inset-x-0 top-0 bottom-0 justify-center items-center -z-10">
                <Text className="text-xl font-bold text-medix-900" numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* Lado Direito: Ícone de Notificações (ou Perfil) */}
            <View className="w-10 h-10 justify-center items-center">
                {onPressRight && (
                    <TouchableOpacity
                        onPress={onPressRight}
                        activeOpacity={0.7}
                        className="p-1"
                    >
                        <Feather name={rightIconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Header;