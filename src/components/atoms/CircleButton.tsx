import { Text, View, Pressable, StyleSheet } from "react-native";

interface IProps {
    label?: string
}

function CircleButton({ label }: IProps) {
    return (
        <Pressable style={styles.roundbutton}>
            <Text style={[styles.text, { transform: [{ translateX: -150 }] }]}>{label}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    roundbutton: {
        position: "relative",
        backgroundColor: "#F3F3F3",
        width: 200,
        height: 200,
        borderRadius: 100
    },
    text: {
        left: "50%",
        top: "50%",
        marginRight: "-50%",
        textAlign: "center",
        fontSize: 24
    }
})

export default CircleButton