import { View, Pressable, StyleSheet, Text } from "react-native"
import { ColourThemes } from "../../../css/colours"

interface IProps {
    title: string;
    active: boolean;
    onPress: (s: string) => void
    isFirstChild: boolean;
    isLastChild: boolean
}

function TabButton(props: IProps) {


    const onPressHandler = () => {
        props.onPress(props.title)
    }
    return (
        <Pressable
            style={[styles.button, {
                backgroundColor: props.active ? ColourThemes.lightCyan : ColourThemes.cyan,
                borderTopLeftRadius: props.isFirstChild ? 10 : 0,
                borderBottomLeftRadius: props.isFirstChild ? 10 : 0,
                borderBottomRightRadius: props.isLastChild ? 10 : 0,
                borderTopRightRadius: props.isLastChild ? 10 : 0,
            }]}
            onPress={onPressHandler}
        >
            <Text style={styles.label}>{props.title}</Text>
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