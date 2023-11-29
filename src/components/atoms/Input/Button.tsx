import { Pressable, StyleSheet, Text, StyleProp, TextStyle, Image } from "react-native";
import { ColourThemes } from "../../../css/colours";
import Icon from "../Icon";
// import iconDone from "../../../assets/icons/done.png"

interface IProps {
    onPress?: () => void;
    label?: string;
    disabled?: boolean;
    style?: StyleProp<TextStyle>;
    size?: number;
    icon?: string
}

const iconButtons = [
    {
        name: "done",
        src: require("../../../assets/icons/done.png")
    },
    {
        name: "trashbin",
        src: require("../../../assets/icons/trashbin.png")
    },
]



function Button(props: IProps) {

    const fetchIcon = (name: string) => {
        return iconButtons.find(icon => icon.name === name)?.src

    }

    return (
        <Pressable
            onPress={props.onPress}
            style={[styles.button, props.style, props.disabled ? styles.disabled : styles.enabled]}
            disabled={props.disabled}
        >
            <Text style={{ fontSize: props.size }}>{props.label}</Text>
            {props.icon && <Image source={fetchIcon(props.icon)} style={{ height: 25, width: 25 }} />}
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