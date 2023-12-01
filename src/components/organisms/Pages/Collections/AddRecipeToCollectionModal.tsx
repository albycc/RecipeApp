import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import ModalWindow from "../../../../components/atoms/modal/ModalWindow";
import InputText from "../../../../components/atoms/Input/InputText";
import Button from "../../../../components/atoms/Input/Button";
import { useState, useEffect } from "react";
import { ICollection } from "../../../../models/ICollection";
import uuid from 'react-native-uuid';
import { CollectionStore } from "../../../../store/collectionStore";
import { router } from "expo-router";
import { RecipeStore } from "../../../../store/recipeStore";
import { IRecipe } from "@/models/IRecipe";
import Icon from "../../../../components/atoms/Icon";
import { ColourThemes } from "../../../../css/colours";

interface IProps {
    visible?: boolean;
    modalClosed: (visible: boolean) => void;
    collection: ICollection
}

interface SelectableRecipe {
    recipe: IRecipe;
    selected: boolean
}

function AddRecipeToCollectionModal(props: IProps) {
    const [recipes, setRecipes] = useState<SelectableRecipe[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const recipes = await RecipeStore.getAllRecipes()

            const selectRecipes: SelectableRecipe[] = recipes.map(recipe => {

                const isAdded = props.collection.recipes.some(recipe => recipes.some(r => r.id === recipe))

                return {
                    recipe,
                    selected: isAdded
                }
            })

            setRecipes(selectRecipes)
        }

        fetchData()

    }, [])

    const addRecipeAsSelected = (id: string) => {
        console.log("add recipe: ", id)
        const index = recipes.findIndex(recipe => recipe.recipe.id === id)
        if (index !== -1) {
            recipes[index].selected = !recipes[index].selected;
            console.log("addRecipeAsSelected recipes: ", recipes)
            setRecipes(recipes)
        }
    }

    const renderItem = (recipe: SelectableRecipe) => {
        return (
            <View style={[styles.recipeCover, recipe.selected ? styles.recipeCoverSelected : null]}>
                <Pressable style={styles.recipeCoverPress} onPress={() => addRecipeAsSelected(recipe.recipe.id)}>
                    <Icon src={recipe.recipe.imageCover} width={50} height={50} />
                    <Text>{recipe.recipe.name}</Text>
                </Pressable>
            </View>
        )
    }

    const addToCollection = async () => {

        const selectedRecipes = recipes.filter(recipe => recipe.selected).map(recipe => recipe.recipe.id)

        console.log("selectedRecipes: ", selectedRecipes)

        await CollectionStore.setRecipes(props.collection.id, selectedRecipes).then(response => {
            if (response === "success") {
                props.modalClosed(false)
            }
        })

    }
    return (
        <ModalWindow visible={props.visible} modalClosed={props.modalClosed}>
            <View style={{ height: "80%", width: 250 }}>
                <Text>Add recipes to {props.collection.title}</Text>
                <InputText />
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => renderItem(item)}
                />
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Button label="Cancel" onPress={() => props.modalClosed(false)} />
                    <Button label="Done" onPress={() => addToCollection()} />
                </View>
            </View>
        </ModalWindow>
    )
}

const styles = StyleSheet.create({
    recipeCover: {
        height: 50,
        marginVertical: 5
    },
    recipeCoverSelected: {
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: ColourThemes.lightCyan
    },
    recipeCoverPress: {
        flex: 1,
        flexDirection: "row",
        height: 50,
    }
})

export default AddRecipeToCollectionModal