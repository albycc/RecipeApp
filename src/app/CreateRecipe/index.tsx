import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRecipeProvider, RecipeActionType } from "../../state/RecipeContext";
import { IRecipe } from "../../models/IRecipe";
import { useState } from "react";
import { router } from "expo-router";
import Button from "../../components/atoms/Button";
import { ColourThemes } from "../../css/colours";
import InputText from "../../components/atoms/InputText";
import Tabs from "../../components/molecules/Tabs/Tabs";
import Tab from "../../components/molecules/Tabs/Tab";
import IngredientsPanel from "../../components/organisms/Pages/CreateRecipe/IngredientsPanel";

function CreateRecipePage() {
    const { dispatch } = useRecipeProvider()
    const [recipe, setRecipe] = useState<IRecipe>({ id: "", name: "", imageCover: "" })

    const createRecipe = () => {
        const recipeObject: IRecipe = { id: (Math.floor(Math.random() * 100)).toString(), name: recipe.name, imageCover: "chicken.png" }
        dispatch({ type: RecipeActionType.ADD, payload: recipeObject })
        console.log("create-recipe create: ", recipeObject)
        router.push("/")
    }

    return <View style={styles.content}>
        <View style={styles.recipeCover}></View>
        <View style={styles.recipePageMain}>

            <View style={{ flex: 1, height: 30, flexDirection: "row", }}>
                <InputText onChange={(v) => setRecipe({ ...recipe, name: v })} />
            </View>
            <View style={{ flex: 1, flexDirection: "row", height: 40 }}>
                <Text>Time: 50</Text>
            </View>
            <View style={{ flex: 1, height: 50, flexDirection: "row" }}>
                <Text>H</Text>
                <Text>T</Text>
                <Text>L</Text>
                <Text>B</Text>
            </View>
            <View style={{ flex: 5, }} >
                <Tabs >
                    <Tab tabName="Ingredients"><IngredientsPanel /></Tab>
                    <Tab tabName="Instructions"><View><Text>2</Text></View></Tab>

                </Tabs>
            </View>
            <View style={{ flex: 1, }}>
                <Button onPress={createRecipe} label="Create" />
                <Button onPress={() => router.push("/")} label="Back" />
            </View>

        </View>

    </View>

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