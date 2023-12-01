import { View, StyleSheet, ScrollView, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ColourThemes } from "../../../css/colours";
import { IRecipe } from "../../../models/IRecipe";
import { RecipeStore } from "../../../store/store";
import Tabs from "../../../components/molecules/Tabs/Tabs";
import Tab from "../../../components/molecules/Tabs/Tab";
import IngredientsPanel from "../../../components/organisms/Pages/CreateRecipe/IngredientsPanel";
import InstructionsPanel from "../../../components/organisms/Pages/CreateRecipe/InstructionsPanel";
import Button from "../../../components/atoms/Input/Button";
import Icon from "../../../components/atoms/Icon";


function Recipe() {
    const { id } = useLocalSearchParams()
    const [recipe, setRecipe] = useState<IRecipe | null>(null)

    useEffect(() => {
        console.log("Recipe id: ", id)
        if (id) {
            const fetchData = async () => {
                const recipe = await RecipeStore.getRecipe(id as string)
                if (recipe) {
                    setRecipe(recipe)
                }
            }
            fetchData()
        }
    }, [id])

    return (
        <View style={styles.content}>
            {recipe && <>
                <View style={styles.recipeCover}>
                    <Icon src={recipe?.imageCover} />
                </View>
                <View style={styles.recipePageMain}>
                    <ScrollView>
                        <View style={{ flex: 1, height: 40, flexDirection: "row", justifyContent: "space-between", marginTop: 10, }}>
                            <Text style={{ fontSize: 30 }}>{recipe.name}</Text>
                            <Button
                                onPress={() => router.push("/recipe/" + id + "/edit")}
                                label="Edit"
                                style={{ marginHorizontal: 10 }}
                                size={20}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", height: 40 }}>
                            <Text style={{ fontSize: 15 }}>{recipe.time}</Text>
                        </View>
                        <View style={{ flex: 5, }} >
                            <Tabs >
                                <Tab tabName="Ingredients">
                                    <IngredientsPanel
                                        ingredientsList={recipe.ingredients}
                                        portions={recipe.nrPortions}
                                        isPortionsAltering={true}
                                    />
                                </Tab>
                                <Tab tabName="Instructions">
                                    <InstructionsPanel
                                        instructionsList={recipe.instructions}
                                    />
                                </Tab>
                            </Tabs>
                        </View>
                    </ScrollView>
                </View>
            </>}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                    onPress={() => router.push("/")}
                    label="Back"
                    style={{ backgroundColor: ColourThemes.lightCyan, marginHorizontal: 10 }}
                    size={20}
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

export default Recipe