import { TextInput, StyleSheet, StyleProp, TextStyle, KeyboardTypeOptions } from "react-native"

interface IProps {
    name?: string;
    onChange?: (s: string) => void;
    noBorder?: true;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: StyleProp<TextStyle>;
    type?: KeyboardTypeOptions;
    maxLength?: number;
    value?: string;
    placeHolder?: string;
    textArea?: boolean;
    numberOfLines?: number;
    defaultText?: string;
}

function InputText(props: IProps) {

    const onChangeHandler = (text: string) => {
        if (props.onChange) {

            props.onChange(text)
        }

    }
    return (
        <TextInput
            style={[styles.style, !props.noBorder && styles.border, props.style]}
            placeholder={props.placeHolder ?? "Enter text"}
            onChangeText={onChangeHandler}
            onBlur={props.onBlur}
            keyboardType={props.type ? props.type : "default"}
            maxLength={props.maxLength}
            value={props.value}
            multiline={props.textArea}
            numberOfLines={props.numberOfLines}
            defaultValue={props.defaultText}
        />
    )

}

const styles = StyleSheet.create({
    style: {
        height: 20,
        width: '90%',
    },
    border: {
        borderColor: "gray",
        borderWidth: 1,
    }
})

export default InputText