import { View, ScrollView, StyleSheet, FlatList, Text } from "react-native";
import HeaderMain from "../../components/templates/HeaderMain";
import RecipeCover from "../../components/molecules/Covers/RecipeCover";
import { useState, useEffect } from "react";
import { ICollection } from "../../models/ICollection";
import { CollectionStore } from "../../store/collectionStore";
import { router, useLocalSearchParams } from "expo-router";
import { IRecipe } from "../../models/IRecipe";
import { RecipeStore } from "../../store/recipeStore";
import CircleButton from "../../components/atoms/Input/CircleButton";
import AddRecipeToCollectionModal from "../../components/organisms/Pages/Collections/AddRecipeToCollectionModal";
import Button from "../../components/atoms/Input/Button";

function CollectionPage() {
    const { id } = useLocalSearchParams()
    const [collection, setCollection] = useState<ICollection | null>(null)
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [showAddRecipeModal, setShowAddRecipeModal] = useState<boolean>(false)

    useEffect(() => {

        if (id) {
            fetchRecipes()
        }
    }, [id])

    useEffect(() => {
        fetchRecipes()

    }, [showAddRecipeModal])

    const fetchRecipes = async () => {
        await CollectionStore.getCollection(id as string).then(async collection => {
            if (collection !== null) {
                setCollection(collection)
                const recipes: IRecipe[] = await Promise.all([...collection.recipes.map(async recipeId => {
                    return await RecipeStore.getRecipe(recipeId)
                })]) as IRecipe[]

                console.log("CollectionPage recipes: ", recipes)

                setRecipes(recipes)
            }
        })
    }

    return (
        <HeaderMain>
            {<View style={styles.container}>
                {showAddRecipeModal && collection && <AddRecipeToCollectionModal
                    visible={showAddRecipeModal}
                    modalClosed={(visible) => setShowAddRecipeModal(visible)}
                    collection={collection}
                />}
                <Button label="<" onPress={() => router.back()} size={20} />
                {collection && <Text style={{ fontSize: 30 }}>{collection.title}</Text>}
                <ScrollView style={{ width: "90%" }}>
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) => (
                            <View style={{ width: "50%", backgroundColor: "orange" }}>
                                <RecipeCover
                                    id={item.id}
                                    imageCover={item.imageCover}
                                    title={item.name}
                                    scale={0.45}
                                />

                            </View>
                        )}
                        keyExtractor={({ id }) => id}
                        scrollEnabled={false}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <CircleButton onPress={() => setShowAddRecipeModal(true)} label="Add recipe" />
                    </View>
                </ScrollView>
            </View>}
        </HeaderMain>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "blue"
    },
});

export default CollectionPage