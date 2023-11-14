import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import CircleButton from "../../../../components/atoms/CircleButton";
import { ColourThemes } from "../../../../css/colours";
import { IIngredient, IIngredientAmount } from "../../../../models/IRecipe";
import Card from "../../../../components/atoms/Card";

function IngredientsPanel() {
    const [countParticipants, setCountParticipants] = useState<number>(4)
    const [ingredientsList, setIngredientsList] = useState<IIngredientAmount[]>([
        { ingredientID: "324", name: "Flour", amount: 2, measureType: "msk" },
        { ingredientID: "584", name: "Milk", amount: 4, measureType: "dl" },
        { ingredientID: "137", name: "Salmon", amount: 1, measureType: "st" },
    ])

    console.log(countParticipants)
    return (
        <View style={{ height: '100%' }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-start", marginTop: 10 }}>
                <CircleButton
                    label="-"
                    diameter={50}
                    colour={ColourThemes.lightCyan}
                    onPress={() =>
                        setCountParticipants(value => value - 1)}
                />
                <Text style={styles.countLabel}>{countParticipants}</Text>
                <CircleButton
                    label="+"
                    diameter={50}
                    colour={ColourThemes.lightCyan}
                    onPress={() => setCountParticipants(value => value + 1)}
                />
            </View>
            <View>
                <FlatList
                    data={ingredientsList}
                    renderItem={({ item }) => {
                        return (
                            <Card margin={10}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Text>{item.amount}</Text>
                                    <Text>{item.name}</Text>
                                </View>
                            </Card>
                        )
                    }
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    countLabel: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        color: "black"
    }
})

export default IngredientsPanel