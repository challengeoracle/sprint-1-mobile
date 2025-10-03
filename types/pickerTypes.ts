interface pickerItemProps {
    label: string;
    value: string;
}

export default interface PickerInputProps {
    label: string;
    selectedValue: string | undefined;
    onValueChange: (value: string | undefined) => void;
    items: pickerItemProps[];
}
