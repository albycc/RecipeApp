import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions } from "react-native";
import { Link } from "expo-router";
import HeaderMain from "../../components/templates/HeaderMain";
import CircleButton from "../../components/atoms/Input/CircleButton";
import { useState, useEffect } from "react";
import NewCollectionModal from "../../components/organisms/Pages/Collections/NewCollectionModal";
import { CollectionStore } from "../../store/collectionStore";
import { ICollection } from "../../models/ICollection";
import RecipeCover from "../../components/molecules/Covers/RecipeCover";
import { RecipeStore } from "../../store/recipeStore";
import { IRecipe } from "../../models/IRecipe";
import CollectionCover from "../../components/molecules/Covers/CollectionCover";

const { width, height } = Dimensions.get('window')

function CollectionsPage() {
    const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);
    const [collections, setCollections] = useState<ICollection[]>([])

    useEffect(() => {
        const fetchData = () => {
            CollectionStore.getAllCollections().then(async (collections) => {

                await Promise.all([...collections.map(async collection => {
                    let recipeData = await Promise.all([...collection.recipes.map(async recipe => { return await RecipeStore.getRecipe(recipe) }
                    )])
                    const collectionRecipes: IRecipe[] = recipeData.filter(((recipe): recipe is IRecipe => !!recipe))
                    console.log("recipes: ", collectionRecipes)
                    collection.covers = collectionRecipes.map(recipe => recipe.imageCover).slice(0, 4)

                    return collection

                })]).then(collections => {
                    setCollections(collections)
                })

                // setCollections(data)
            })
        }
        fetchData()
    }, [])

    console.log("showCollectionModal: ", showCollectionModal)

    return (
        <HeaderMain>
            <View style={styles.container}>
                <NewCollectionModal
                    visible={showCollectionModal}
                    onClose={() => setShowCollectionModal(false)}
                />
                <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ alignItems: "center", width }}>
                    <CircleButton label="New Collection" onPress={() => setShowCollectionModal(true)} diameter={120} />
                    <FlatList
                        data={collections}
                        renderItem={({ item }) => (
                            <CollectionCover
                                id={item.id}
                                title={item.title}
                                recipeCovers={item.covers ?? []} />
                        )}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        style={{ marginTop: 20 }}
                    />
                </ScrollView>
            </View>
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

});

export default CollectionsPage