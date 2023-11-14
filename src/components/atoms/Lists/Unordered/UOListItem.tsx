import { View, StyleSheet } from "react-native";
import { ColourThemes } from "../../../../css/colours";
import React from "react"

interface IProps {
    children?: React.ReactElement[]
}

function UOListItem({ children }: IProps) {
    return <View style={styles.item}>{children}</View>

}

const styles = StyleSheet.create({
    item: {
        borderRadius: 8,
        backgroundColor: ColourThemes.lightGrey

    }

})

export default UOListItem