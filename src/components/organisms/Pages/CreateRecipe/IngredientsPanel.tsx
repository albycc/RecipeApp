import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import CircleButton from "../../../atoms/Input/CircleButton";
import { ColourThemes } from "../../../../css/colours";
import { IIngredient, IRecipeIngredient, IMeasure, } from "../../../../models/IRecipe";
import Card from "../../../../components/atoms/Card";
import InputText from "../../../atoms/Input/InputText";
import Button from "../../../atoms/Input/Button";
import Dropdown from "../../../atoms/Input/Dropdown";
import { generateNumberId } from "../../../../utils/idMathGen";


interface IProps {
    ingredientsList: IRecipeIngredient[];
    onListChanged?: (list: IRecipeIngredient[]) => void
    portions?: number;
    onPortionsChanged?: (portions: number) => void;
    isPortionsAltering?: boolean;
    editMode?: true;
}

function IngredientsPanel(props: IProps) {
    const [countPortions, setCountPortions] = useState<number>(0)
    const [ingredientsList, setIngredientsList] = useState<IRecipeIngredient[]>([])
    const [editIngredient, setEditIngredient] = useState<IRecipeIngredient | null>(null)
    const [measuresList, setMeasuresList] = useState([
        { label: "g", value: "gram" },
        { label: "dl", value: "dl" },
        { label: "msk", value: "msk" },
        { label: "tsk", value: "tsk" },
        { label: "krm", value: "krm" },
    ])
    // const [portionsScale, setPortionsScale] = useState<number>(1)

    console.log("editMode: ", props.editMode)

    useEffect(() => {
        setIngredientsList(props.ingredientsList)
        if (props.portions)
            setCountPortions(props.portions)
    }, [])

    useEffect(() => {
        if (props.onListChanged) {
            props.onListChanged(ingredientsList)
        }
    }, [ingredientsList])

    useEffect(() => {
        if (props.isPortionsAltering && props.portions) {
            // setPortionsScale(countPortions / props.portions)
            const recipePortions = props.portions
            const list = props.ingredientsList.map(ingredient => { return { ...ingredient, amount: (countPortions / recipePortions) * ingredient.amount } })
            setIngredientsList(list)
        }
        if (props.onPortionsChanged)
            props.onPortionsChanged(countPortions)
    }, [countPortions])

    const newIngredientButtonHandler = () => {
        const newIngredient: IRecipeIngredient = {
            id: generateNumberId(), name: "", amount: 0, measureType: ""
        }
        setIngredientsList([...ingredientsList, newIngredient])
    }

    // const createIngredientButtonHandler = () => {
    //     if (newIngredient) {
    //         setIngredientsList([...ingredientsList, newIngredient])
    //         setNewIngredientMode(false)
    //         setNewIngredient(null)
    //     }
    // }

    const EditIngredientItem = (ingredientItem: IRecipeIngredient) => {
        console.log("editIngredient: ", editIngredient)
        console.log("ingredientItem: ", ingredientItem)
        return (
            <Card margin={10}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {props.editMode ? (
                        <>
                            {editIngredient && editIngredient.id === ingredientItem.id ?
                                <>
                                    <InputText
                                        style={{ width: 30 }}
                                        value={editIngredient.amount.toString()}
                                        onChange={(s) => setEditIngredient({ ...ingredientItem, amount: +s })}
                                        noBorder
                                    />
                                    <Dropdown
                                        options={measuresList}
                                        valueSelected={(option) => setEditIngredient({ ...ingredientItem, measureType: option.value })}
                                        value={editIngredient.measureType}
                                    />

                                    <InputText
                                        style={{ flex: 1 }}
                                        value={editIngredient.name}
                                        placeHolder="Enter ingredient"
                                        onChange={(s) => setEditIngredient({ ...ingredientItem, name: s })}
                                        noBorder
                                    />
                                    <Button icon="done" onPress={ingredientEditDoneHandler} />
                                    <Button icon="trashbin" onPress={deleteIngredientHandler} />


                                </>
                                :
                                <Pressable style={{ flexDirection: "row", width: "100%" }} onPress={() => {
                                    console.log("open")
                                    setEditIngredient(ingredientItem)
                                }}>
                                    <Text>{ingredientItem.amount}</Text>
                                    <Text style={{ marginHorizontal: 5 }}>{ingredientItem.measureType}</Text>
                                    <Text>{ingredientItem.name}</Text>
                                </Pressable>
                            }

                        </>
                    ) : (
                        <>
                            <Text>{ingredientItem.amount}</Text>
                            <Text style={{ marginHorizontal: 5 }}>{ingredientItem.measureType}</Text>
                            <Text>{ingredientItem.name}</Text>
                        </>
                    )}

                </View>
            </Card>
        )
    }

    const ingredientEditDoneHandler = () => {

        console.log("ingredientEditDoneHandler")

        if (editIngredient) {
            const index = ingredientsList.findIndex(ingredient => ingredient.id === editIngredient.id)
            console.log("index: ", index)
            if (index !== -1) {

                ingredientsList[index] = editIngredient

                setIngredientsList(ingredientsList)
                setEditIngredient(null)
                if (props.onListChanged)
                    props.onListChanged(ingredientsList)
            }
        }
    }

    const deleteIngredientHandler = () => {
        if (editIngredient) {
            const list = ingredientsList.filter((ingredient) => ingredient.id !== editIngredient.id)
            setIngredientsList(list)
        }
    }

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
                    renderItem={({ item, index }) => EditIngredientItem(item)}
                    scrollEnabled={false}
                />
                {props.onListChanged && (
                    <Card margin={10}>
                        <View style={{ flexDirection: "row" }}>
                            <Pressable onPress={() => newIngredientButtonHandler()}>
                                <Text style={{ color: "#9c9c9c", textAlign: "center" }}>New ingredient...</Text>
                            </Pressable>
                        </View>
                    </Card>
                )}
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