import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useRecipeProvider, RecipeActionType } from "../../state/RecipeContext";
import { IRecipe } from "../../models/IRecipe";
import { useState } from "react";
import { router } from "expo-router";
import Button from "../../components/atoms/Button";

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
        <Text>Create Recipe</Text>
        <TextInput style={styles.textField} onChangeText={(v) => setRecipe({ ...recipe, name: v })} value={recipe.name} />
        <Button onPress={createRecipe} label="Create" />
        <Button onPress={() => router.push("/")} label="Back" />

    </View>

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "white"
    },
    textField: {
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