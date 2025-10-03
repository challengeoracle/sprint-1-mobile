import PickerInputProps from "@/types/pickerTypes";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const PickerInput = ({ label, selectedValue, onValueChange, items }: PickerInputProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Texto a ser exibido no seletor
    const displayValue = selectedValue ? items.find((item) => item.value === selectedValue)?.label : label;

    // Seletor nativo para Android
    if (Platform.OS === "android") {
        return (
            <View className="bg-white border border-medix-200 rounded-lg h-14 justify-center mb-4">
                <Picker selectedValue={selectedValue} onValueChange={onValueChange} className="text-medix-900">
                    <Picker.Item label={label} value={undefined} color="#9ca3af" />
                    {items.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        );
    }

    // Seletor com modal para iOS
    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8} className="bg-white border border-medix-200 rounded-lg h-14 justify-between items-center px-3 flex-row mb-4">
                <Text className={`text-base ${selectedValue ? "text-medix-900" : "text-gray-400"}`}>{displayValue}</Text>
                <Feather name="chevron-down" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="flex-1 justify-end bg-black/50">
                        <TouchableWithoutFeedback>
                            <View className="bg-white rounded-t-2xl p-4">
                                <Picker selectedValue={selectedValue} onValueChange={onValueChange} itemStyle={{ color: "#1f2937", fontSize: 20 }}>
                                    <Picker.Item label={label} value={undefined} />
                                    {items.map((item) => (
                                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    ))}
                                </Picker>
                                <Button title="Confirmar" onPress={() => setModalVisible(false)} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default PickerInput;
