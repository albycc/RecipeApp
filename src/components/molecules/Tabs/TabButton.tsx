import { View, Pressable, StyleSheet, Text } from "react-native"
import { ColourThemes } from "../../../css/colours"

interface IProps {
    title: string;
    active: boolean;
    onPress: (s: string) => void
}

function TabButton({ title, active, onPress }: IProps) {


    const onPressHandler = () => {
        onPress(title)
    }
    return (
        <Pressable
            style={[styles.button, { backgroundColor: active ? ColourThemes.lightCyan : ColourThemes.cyan }]}
            onPress={onPressHandler}
        >
            <Text style={styles.label}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: ColourThemes.cyan,
    },
    label: {
        color: "black",
        fontSize: 20,
        paddingHorizontal: 6,
        paddingVertical: 5
    }
})

export default TabButton