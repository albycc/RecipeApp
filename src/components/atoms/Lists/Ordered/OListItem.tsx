import { View, StyleSheet, Text } from "react-native";
import { ColourThemes } from "../../../../css/colours";
import React from "react"
import Card from "../../Card";

interface IProps {
    nr: number;
    children?: React.ReactElement[] | React.ReactElement
}

function OListItem({ children, nr }: IProps) {
    return (
        <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
            <View style={styles.circleNrItem}>
                <Text>{nr + 1}</Text>
            </View>
            <Card>
                {children}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    circleNrItem: {
        borderRadius: 100,
        width: 50,
        height: 50,
        backgroundColor: ColourThemes.cyan,
        color: "grey",
        marginHorizontal: 5,
        margin: "auto",
        paddingHorizontal: 20,
        paddingVertical: 15
    }
})

export default OListItem