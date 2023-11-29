import { Text, View, Pressable, StyleSheet } from "react-native";
import { ColourThemes } from "../../../css/colours";

interface IProps {
    label?: string;
    diameter?: number;
    colour?: string;
    onPress?: () => void
}

function CircleButton({ label, diameter, colour, onPress }: IProps) {

    const onPressHandler = () => {
        if (onPress)
            onPress()
    }

    return (
        <Pressable
            style={[styles.roundbutton, {
                width: diameter ?? 100,
                height: diameter ?? 100,
                backgroundColor: colour ?? ColourThemes.lightGrey
            }]}
            onPress={onPressHandler}
        >
            <Text style={[styles.text]}>{label}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    roundbutton: {
        borderRadius: 100
    },
    text: {
        textAlign: "center",
        fontSize: 24
    }
})

export default CircleButton