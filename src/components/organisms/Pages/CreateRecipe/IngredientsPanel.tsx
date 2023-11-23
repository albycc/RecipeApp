import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import CircleButton from "../../../../components/atoms/CircleButton";
import { ColourThemes } from "../../../../css/colours";
import { IIngredient, IRecipeIngredient } from "../../../../models/IRecipe";
import Card from "../../../../components/atoms/Card";
import InputText from "../../../atoms/InputText";
import Button from "../../../../components/atoms/Button";

interface IProps {
    ingredientsList: IRecipeIngredient[];
    onListChanged: (list: IRecipeIngredient[]) => void
    onPortionsChanged: (portions: number) => void
}

function IngredientsPanel(props: IProps) {
    const [countPortions, setCountPortions] = useState<number>(4)
    const [ingredientsList, setIngredientsList] = useState<IRecipeIngredient[]>([])
    const [newIngredientMode, setNewIngredientMode] = useState<boolean>(false)
    const [newIngredient, setNewIngredient] = useState<IRecipeIngredient | null>(null)

    useEffect(() => {
        setIngredientsList(props.ingredientsList)
    }, [])

    useEffect(() => {
        props.onListChanged(ingredientsList)
    }, [ingredientsList])

    useEffect(() => {
        props.onPortionsChanged(countPortions)
    }, [countPortions])

    const newIngredientButtonHandler = () => {
        const newIngredient: IRecipeIngredient = {
            name: "", amount: 0, measureType: ""
        }
        setNewIngredientMode(true)
        setNewIngredient(newIngredient)

    }

    const createIngredientButtonHandler = () => {
        if (newIngredient) {
            setIngredientsList([...ingredientsList, newIngredient])
            setNewIngredientMode(false)
            setNewIngredient(null)

        }

    }

    const EditIngredientItem = (ingredientItem: IRecipeIngredient) => {
        return (
            <Card margin={10}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {newIngredient?.name === ingredientItem.name ?
                        <>
                            <InputText
                                style={{ width: 30 }}
                                onBlur={ingredientInputOnBlurHandler}
                                value={newIngredient.amount.toString()}
                                onChange={(s) => setNewIngredient({ ...newIngredient, amount: +s })}
                                noBorder
                            />
                            <InputText
                                style={{ width: 40, marginHorizontal: 10 }}
                                value={newIngredient.measureType}
                                placeHolder="Type"
                                onChange={(s) => setNewIngredient({ ...newIngredient, measureType: s })}
                                noBorder
                            />
                            <InputText
                                style={{ flex: 1 }}
                                value={newIngredient.name}
                                placeHolder="Enter ingredient"
                                onChange={(s) => setNewIngredient({ ...newIngredient, name: s })}
                                noBorder
                            />
                        </>
                        :
                        <Pressable style={{ flexDirection: "row" }} >
                            <Text>{ingredientItem.amount}</Text>
                            <Text style={{ marginHorizontal: 5 }}>{ingredientItem.measureType}</Text>
                            <Text>{ingredientItem.name}</Text>
                        </Pressable>
                    }
                </View>
            </Card>
        )
    }

    const ingredientInputOnBlurHandler = () => {

        // const ingredientList = ingredientsList.map(ingredient => )

        // console.log("on blur: ", event)



    }


    console.log(countPortions)
    return (
        <View style={{ height: '100%' }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-start", marginTop: 10 }}>
                <CircleButton
                    label="-"
                    diameter={50}
                    colour={ColourThemes.lightCyan}
                    onPress={() => {
                        if (countPortions > 1) {
                            setCountPortions(value => value - 1)
                        }
                    }
                    }
                />
                <Text style={styles.countLabel}>{countPortions}</Text>
                <CircleButton
                    label="+"
                    diameter={50}
                    colour={ColourThemes.lightCyan}
                    onPress={() => setCountPortions(value => value + 1)}
                />
            </View>
            <View>
                <FlatList
                    data={ingredientsList}
                    renderItem={({ item }) => EditIngredientItem(item)}
                    scrollEnabled={false}
                />
                {newIngredientMode ?
                    <View>
                        {newIngredient && EditIngredientItem(newIngredient)}
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>

                            <Button label="Cancel" onPress={() => setNewIngredientMode(false)} />
                            <Button label="Create" onPress={() => createIngredientButtonHandler()} />
                        </View>
                    </View>
                    :
                    <Card margin={10}>
                        <View style={{ flexDirection: "row" }}>
                            <Pressable onPress={() => newIngredientButtonHandler()}>
                                <Text style={{ color: "#9c9c9c", textAlign: "center" }}>New ingredient...</Text>
                            </Pressable>
                        </View>
                    </Card>
                }
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