import UnitCard from "@/components/UnitCard";
import { Text, View } from "react-native";

const NearbyUnits = () => {
    return (
        <View className="mb-8">
            <Text className="text-lg font-bold text-medix-800 mb-4">Unidades Próximas</Text>
            <View className="gap-3">
                <UnitCard name="Hospital Central de Caieiras" address="Av. Paulicéia, 230" type="HOSPITAL" />
                <UnitCard name="Clínica Medix Laranjeiras" address="R. dos Pinheiros, 12" type="CLINICA" />
                <UnitCard name="Laboratório Análises" address="Centro, Rua 7 de Setembro" type="LABORATORIO" />
            </View>
        </View>
    );
};

export default NearbyUnits;
