import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Platform,
    Modal,
    Button,
    ViewStyle,
    TextStyle,
    TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
// =================================================================
// PASSO 1: Importar o router do Expo
// =================================================================
import { router } from 'expo-router';

// --- Definição dos Tipos para as Props ---
type Item = {
    label: string;
    value: string;
};

type PickerInputProps = {
    label: string;
    selectedValue: string | undefined;
    onValueChange: (value: string | undefined) => void;
    items: Item[];
};

// --- Componente customizado para o seletor ---
const PickerInput = ({ label, selectedValue, onValueChange, items }: PickerInputProps) => {
    // ... (O componente PickerInput continua igual)
    const [modalVisible, setModalVisible] = useState(false);
    
    const displayValue = selectedValue ? items.find(item => item.value === selectedValue)?.label : label;

    if (Platform.OS === 'android') {
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.pickerAndroid}
                >
                    <Picker.Item label={label} value={undefined} color="#9ca3af" />
                    {items.map(item => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        );
    }
    
    return (
        <>
            <TouchableOpacity 
                style={styles.pickerContainer} 
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={[styles.pickerIosText, !selectedValue && { color: '#9ca3af' }]}>
                    {displayValue}
                </Text>
                <Feather name="chevron-down" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                             <View style={styles.modalContent}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={onValueChange}
                                    style={styles.pickerIosModal}
                                    itemStyle={{ color: '#1f2937', fontSize: 20 }}
                                >
                                    <Picker.Item label={label} value={undefined} />
                                    {items.map(item => (
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


// --- Tela Principal ---
const AgendamentoOnline = () => {
    const [hospital, setHospital] = useState<string | undefined>();
    const [medico, setMedico] = useState<string | undefined>();
    const [especialidade, setEspecialidade] = useState<string | undefined>();
    const [modalidade, setModalidade] = useState<string | undefined>();

    // =================================================================
    // PASSO 2: Atualizar a função de confirmação
    // =================================================================
    const handleConfirmarAgendamento = () => {
        // Validação para ver se todos os campos estão preenchidos
        if (!hospital || !medico || !especialidade || !modalidade) {
            Alert.alert("Campos incompletos", "Por favor, selecione todas as opções.");
            return;
        }

        // Se estiver tudo certo, exibe o alerta de sucesso
        Alert.alert(
            "Agendamento Confirmado!",
            "Sua consulta foi agendada com sucesso.",
            [
                // Adicionamos um botão "OK" que, ao ser pressionado, volta para a tela anterior
                {
                    text: "OK",
                    onPress: () => router.back(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <PickerInput
                    label="Selecione um Hospital..."
                    selectedValue={hospital}
                    onValueChange={setHospital}
                    items={[
                        { label: 'São Camilo', value: 'São Camilo' },
                        { label: 'Oswaldo Cruz', value: 'Oswaldo Cruz' },
                        { label: 'Albert Einstein', value: 'Albert Einstein' },
                    ]}
                />
                <PickerInput
                    label="Selecione um Médico..."
                    selectedValue={medico}
                    onValueChange={setMedico}
                    items={[
                        { label: 'Arthur', value: 'Arthur' },
                        { label: 'Davi', value: 'Davi' },
                        { label: 'Matheus', value: 'Matheus' },
                    ]}
                />
                <PickerInput
                    label="Selecione uma Especialidade..."
                    selectedValue={especialidade}
                    onValueChange={setEspecialidade}
                    items={[
                        { label: 'Ortopedia', value: 'Ortopedia' },
                        { label: 'Cardiologia', value: 'Cardiologia' },
                        { label: 'Neurologia', value: 'Neurologia' },
                    ]}
                />
                <PickerInput
                    label="Selecione a Modalidade..."
                    selectedValue={modalidade}
                    onValueChange={setModalidade}
                    items={[
                        { label: 'Online', value: 'Online' },
                        { label: 'Presencial', value: 'Presencial' },
                    ]}
                />
                
                <TouchableOpacity onPress={handleConfirmarAgendamento} style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar Agendamento</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- Estilos ---
interface StyleGuide {
    safeArea: ViewStyle;
    scrollView: ViewStyle;
    pickerContainer: ViewStyle;
    pickerAndroid: TextStyle;
    pickerIosText: TextStyle;
    modalOverlay: ViewStyle;
    modalContent: ViewStyle;
    pickerIosModal: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
}

const styles = StyleSheet.create<StyleGuide>({
    safeArea: { flex: 1, backgroundColor: '#F0F7F7' },
    scrollView: { flexGrow: 1, padding: 16 },
    pickerContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        marginBottom: 16,
        height: 56,
        justifyContent: 'center',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerAndroid: { color: '#1f2937', flex: 1 },
    pickerIosText: {
        color: '#1f2937',
        fontSize: 16,
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    pickerIosModal: { width: '100%' },
    button: {
        backgroundColor: '#008080',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AgendamentoOnline;