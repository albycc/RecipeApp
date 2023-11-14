import React from "react"
import { View, StyleSheet } from "react-native"
import { ColourThemes } from "../../css/colours"

interface IProps {
    children: React.ReactNode[] | React.ReactNode;
    borderRadius?: number;
    padding?: number;
    margin?: number
}

function Card({ children, margin }: IProps) {
    return <View style={[styles.card, { margin }]}>{children}</View>

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: ColourThemes.lightGrey
    }
})

export default Card