import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRecipeProvider, RecipeActionType } from "../../../state/RecipeContext";
import { IRecipe } from "../../../models/IRecipe";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../../../components/atoms/Button";
import { ColourThemes } from "../../../css/colours";
import InputText from "../../../components/atoms/InputText";
import Tabs from "../../../components/molecules/Tabs/Tabs";
import Tab from "../../../components/molecules/Tabs/Tab";
import IngredientsPanel from "../../../components/organisms/Pages/CreateRecipe/IngredientsPanel";
import InstructionsPanel from "../../../components/organisms/Pages/CreateRecipe/InstructionsPanel";
import { RecipeStore } from "../../../store/store";
import uuid from 'react-native-uuid';

function CreateRecipePage() {
    const { dispatch } = useRecipeProvider()
    const { id } = useLocalSearchParams()
    const [recipe, setRecipe] = useState<IRecipe | null>(null)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const recipeId: string = (id as string).substring(1, id.length - 1)
                console.log("Edit recipe id: ", recipeId)
                console.log("id type: ", typeof recipeId)
                const recipe = await RecipeStore.getRecipe(recipeId)
                if (recipe) {
                    setRecipe(recipe)
                }
            }
            fetchData()
        }
    }, [id])

    const editRecipe = () => {
        // if (recipe) {
        //     recipe.id = uuid.v4() as string
        //     recipe.imageCover = "chicken.png"

        //     console.log("store recipe ", recipe)

        //     RecipeStore.setRecipe(recipe).then(data => {
        //         if (data === "success") {

        //             router.push("/")
        //         }
        //     })

        // }

        // dispatch({ type: RecipeActionType.ADD, payload: recipe })
        // console.log("create-recipe create: ", recipe)
    }

    useEffect(() => {
        if (recipe) {
            const { name } = recipe
            console.log("recipe: ", recipe)
            setDisableButton(!(name !== ""))
        }
    }, [recipe])

    // const disableButton = () => {
    //     const { name, ingredients, instructions } = recipe
    //     console.log("recipe: ", recipe)
    //     return name !== "" && ingredients.length > 0 && instructions.length > 0
    // }

    return (
        <View style={styles.content}>
            <View style={styles.recipeCover}></View>
            {recipe && <View style={styles.recipePageMain}>
                <ScrollView>
                    <View style={{ flex: 1, height: 40, flexDirection: "row", marginTop: 10 }}>
                        <InputText
                            onChange={(v) =>
                                setRecipe({ ...recipe, name: v })}
                            noBorder style={{ fontSize: 30 }}
                            placeHolder="Recipe title"
                            defaultText={recipe.name}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", height: 40 }}>
                        <InputText
                            onChange={(v) =>
                                setRecipe({ ...recipe, time: +v })}
                            noBorder style={{ fontSize: 15 }}
                            placeHolder="Time"
                        />
                    </View>
                    <View style={{ flex: 5, }} >
                        <Tabs >
                            <Tab tabName="Ingredients">
                                <IngredientsPanel
                                    onListChanged={(ingredients) => setRecipe({ ...recipe, ingredients })}
                                    ingredientsList={recipe.ingredients}
                                    onPortionsChanged={(portions) => setRecipe({ ...recipe, nrPortions: portions })}
                                />
                            </Tab>
                            <Tab tabName="Instructions">
                                <InstructionsPanel
                                    instructionsList={recipe.instructions}
                                    setInstructionsList={(list) => setRecipe({ ...recipe, instructions: list })}
                                />
                            </Tab>
                        </Tabs>
                    </View>
                </ScrollView>
            </View>}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                    onPress={() => router.push("/recipe/" + id + "")}
                    label="Back"
                    style={{ backgroundColor: ColourThemes.lightCyan, marginHorizontal: 10 }}
                    size={20}
                />
                <Button
                    onPress={() => editRecipe}
                    label="Save"
                    style={{ marginHorizontal: 10 }}
                    size={20}
                    disabled={disableButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "white"
    },
    recipeCover: {
        flex: 1,
        backgroundColor: ColourThemes.lightGrey
    },
    recipePageMain: {
        flex: 3,
        overflow: "scroll"
    },
    textField: {
        flex: 1,
        borderColor: "grey",
        borderWidth: 1
    },
    button: {
        backgroundColor: "orange",
        padding: 2,
        width: 100,
        textAlign: "center"
    }
})

export default CreateRecipePage