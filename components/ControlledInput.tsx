import inputControllerProps from "@/types/inputControllerTypes";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

// Um componente de TextInput controlado e reutilizável para o React Hook Forms + Zod
export function ControlledInput<T extends FieldValues>({ control, name, label, error, formatValue, ...rest }: inputControllerProps<T>) {
    return (
        <View>
            {/* Texto do campo */}
            <Text className="text-base text-medix-700 mb-1 font-semibold">{label}</Text>

            {/* Controller do React Hook Form que gerencia o estado do TextInput */}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                    // Função para formatar texto caso seja passado
                    const handleChange = (text: string) => {
                        const formattedValue = formatValue ? formatValue(text) : text;
                        onChange(formattedValue);
                    };

                    return <TextInput className={`bg-white border ${error ? "border-medix-error" : "border-medix-200"} rounded-lg p-3 text-base`} onBlur={onBlur} onChangeText={handleChange} value={value} {...rest} />;
                }}
            />

            {/* Mensagem de erro */}
            {error && <Text className="text-medix-error text-sm mt-1">{error.message}</Text>}
        </View>
    );
}
