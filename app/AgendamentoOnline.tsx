import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet, 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '@/components/header'; 
// --- Componente da Tela de Agendamento Online ---
const AgendamentoOnline = () => {
    // Estados para controlar o valor selecionado em cada Picker
    const [hospital, setHospital] = useState<string>('');
    const [medico, setMedico] = useState<string>('');
    const [especialidade, setEspecialidade] = useState<string>('');
    const [modalidade, setModalidade] = useState<string>('');

    // Função para lidar com o pressionamento do botão de confirmação
    const handleConfirmarAgendamento = () => {
        Alert.alert(
            "Agendamento Confirmado", // Título do Alerta
            "As informações chegarão por email." // Mensagem
        );
    };

    
    const getPickerTextStyle = (value: string) => {
        return {
            color: value ? '#1f2937' : '#9ca3af', };
    };

    return (
        
        <SafeAreaView className="flex-1 bg-medix-100">
            {/* 1. Componente Header */}
            <Header
                title="Agendamento Online"
                onPressLeft={() => { console.log("Menu Pressionado"); }}
                onPressRight={() => { console.log("Notificações Pressionadas"); }}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* 2. Contêiner do Formulário */}
                <View className="p-4">
                    {/* --- Campo de Hospitais --- */}
                    
                    <View className="mb-4 bg-white border border-gray-200 rounded-lg p-4 h-14 justify-center">
                        <Picker
                            selectedValue={hospital}
                            onValueChange={(itemValue) => setHospital(itemValue)}
                            style={[StyleSheet.absoluteFill, getPickerTextStyle(hospital)]} // Picker preenche o View pai
                        >
                            <Picker.Item label="Selecione um Hospital..." value="" enabled={false} />
                            <Picker.Item label="São Camilo" value="São Camilo" />
                            <Picker.Item label="Oswaldo Cruz" value="Oswaldo Cruz" />
                            <Picker.Item label="Albert Einstein" value="Albert Einstein" />
                        </Picker>
                    </View>

                    {/* --- Campo de Médicos --- */}
               
                    <View className="mb-4 bg-white border border-gray-200 rounded-lg p-4 h-14 justify-center">
                        <Picker
                            selectedValue={medico}
                            onValueChange={(itemValue) => setMedico(itemValue)}
                            style={[StyleSheet.absoluteFill, getPickerTextStyle(medico)]}
                        >
                            <Picker.Item label="Selecione um Médico..." value="" enabled={false} />
                            <Picker.Item label="Arthur" value="Arthur" />
                            <Picker.Item label="Davi" value="Davi" />
                            <Picker.Item label="Matheus" value="Matheus" />
                        </Picker>
                    </View>

                    {/* --- Campo de Especialidade --- */}
                    
                    <View className="mb-4 bg-white border border-gray-200 rounded-lg p-4 h-14 justify-center">
                        <Picker
                            selectedValue={especialidade}
                            onValueChange={(itemValue) => setEspecialidade(itemValue)}
                            style={[StyleSheet.absoluteFill, getPickerTextStyle(especialidade)]}
                        >
                            <Picker.Item label="Selecione uma Especialidade..." value="" enabled={false} />
                            <Picker.Item label="Ortopedia" value="Ortopedia" />
                            <Picker.Item label="Cardiologia" value="Cardiologia" />
                            <Picker.Item label="Neurologia" value="Neurologia" />
                        </Picker>
                    </View>

                    {/* --- Campo de Modalidade --- */}
                  
                    <View className="mb-4 bg-white border border-gray-200 rounded-lg p-4 h-14 justify-center">
                        <Picker
                            selectedValue={modalidade}
                            onValueChange={(itemValue) => setModalidade(itemValue)}
                            style={[StyleSheet.absoluteFill, getPickerTextStyle(modalidade)]}
                        >
                            <Picker.Item label="Selecione a Modalidade..." value="" enabled={false} />
                            <Picker.Item label="Online" value="Online" />
                            <Picker.Item label="Presencial" value="Presencial" />
                        </Picker>
                    </View>

                    {/* 3. Botão de Confirmação */}
                  
                    <TouchableOpacity
                        onPress={handleConfirmarAgendamento}
                        activeOpacity={0.8}
                        className="bg-medix-600 p-4 rounded-lg mt-4 items-center"
                    >
                        <Text className="text-white text-lg font-bold">
                            Confirmar Agendamento
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AgendamentoOnline;