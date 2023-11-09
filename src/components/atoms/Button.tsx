import { Pressable, StyleSheet, Text } from "react-native";

interface IProps {
    onPress?: () => void;
    label?: string
}

function Button({ onPress, label }: IProps) {


    return (
        <Pressable onPress={onPress ? () => onPress() : () => { }} style={styles.button} >
            <Text>{label ?? "ll"}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        minWidth: 10,
        backgroundColor: "#73FFAB",
        padding: 3,
        borderRadius: 6,
        flexGrow: 0
    }
})

export default Button