import { TextInput, StyleSheet } from "react-native"

interface IProps {
    onChange?: (s: string) => void
}

function InputText({ onChange }: IProps) {

    const onChangeHandler = (text: string) => {
        if (onChange) {

            onChange(text)
        }

    }
    return (
        <TextInput
            style={styles.style}
            placeholder="Enter text"
            onChangeText={onChangeHandler}
        />
    )

}

const styles = StyleSheet.create({
    style: {
        height: 20,
        width: '90%',
        borderColor: "gray",
        borderWidth: 1,

    }
})

export default InputText