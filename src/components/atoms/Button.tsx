import { Pressable, StyleSheet, Text, StyleProp, TextStyle, } from "react-native";
import { ColourThemes } from "../../css/colours";

interface IProps {
    onPress?: () => void;
    label?: string;
    disabled?: boolean;
    style?: StyleProp<TextStyle>;
    size?: number;
}

function Button(props: IProps) {

    console.log("Button disabled: ", props.disabled)

    return (
        <Pressable
            onPress={props.onPress}
            style={[styles.button, props.style, props.disabled ? styles.disabled : styles.enabled]}
            disabled={props.disabled}
        >
            <Text style={{ fontSize: props.size }}>{props.label}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        minWidth: 10,
        padding: 3,
        borderRadius: 6,
        flexGrow: 0,
    },
    enabled: {
        backgroundColor: ColourThemes.cyan
    },
    disabled: {
        backgroundColor: ColourThemes.lightGrey

    }
})

export default Button