import { View, StyleSheet, ScrollView, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ColourThemes } from "../../../css/colours";
import { IRecipe, IRecipeIngredient, IRecipeInstruction } from "../../../models/IRecipe";
import { RecipeStore } from "../../../store/recipeStore";
import Tabs from "../../../components/molecules/Tabs/Tabs";
import Tab from "../../../components/molecules/Tabs/Tab";
import IngredientsPanel from "../../../components/organisms/Pages/CreateRecipe/IngredientsPanel";
import InstructionsPanel from "../../../components/organisms/Pages/CreateRecipe/InstructionsPanel";
import Button from "../../../components/atoms/Input/Button";
import Icon from "../../../components/atoms/Icon";
import IconClock from "../../../assets/icons/clock.svg"


function Recipe() {
    const { id } = useLocalSearchParams()
    const [recipe, setRecipe] = useState<IRecipe | null>(null)

    useEffect(() => {
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

    const timeDisplay = (recipeMinutes: number) => {
        let timeDisplayString: string = recipeMinutes.toString() + " min"
        if (recipeMinutes > 60) {
            const hours = Math.floor(recipeMinutes / 60)
            const restOfMinutes = recipeMinutes - (hours * 60)
            timeDisplayString = `${hours} h\n${restOfMinutes} min`
        }
        return timeDisplayString

    }

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
                        <View style={{ flex: 1, flexDirection: "row", height: 100, padding: 10, marginHorizontal: 50 }}>
                            <View style={{ flex: 1, position: "relative", justifyContent: "center", alignItems: "center", maxWidth: 60, maxHeight: 60 }}>
                                <IconClock width={60} height={60} style={{ position: "absolute" }} />
                                <Text style={{ fontSize: 15, textAlign: "center" }}>{timeDisplay(recipe.time)}</Text>
                            </View>
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
                    onPress={() => router.back()}
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