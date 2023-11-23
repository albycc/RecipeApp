import React from "react"
import { View, StyleSheet } from "react-native"
import { ColourThemes } from "../../css/colours"

interface IProps {
    children: React.ReactNode[] | React.ReactNode;
    padding?: number;
    margin?: number;
    roundness?: number;
}

function Card(props: IProps) {
    return <View style={[styles.card, { margin: props.margin, borderRadius: props.roundness }]}>{props.children}</View>

}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 20,
        padding: 10,
        backgroundColor: ColourThemes.lightGrey
    }
})

export default Card