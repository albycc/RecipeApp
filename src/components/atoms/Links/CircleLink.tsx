import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface IProps {
    href: string
    label?: string
}

function CircleLink({ href, label }: IProps) {
    return (
        <Link href={href} style={styles.roundbutton}>
            {label}
        </Link>
    )

}

const styles = StyleSheet.create({
    roundbutton: {
        position: "relative",
        backgroundColor: "#F3F3F3",
        width: 200,
        height: 200,
        borderRadius: 100,
        textAlign: "center",
        fontSize: 24
    },
})

export default CircleLink