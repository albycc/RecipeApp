import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
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

function CollectionsPage() {
    const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);
    const [collections, setCollections] = useState<ICollection[]>([])

    useEffect(() => {
        const fetchData = () => {
            console.log("fetch collections")
            CollectionStore.getAllCollections().then(async (collections) => {
                console.log("fetch collections recipes")
                await Promise.all([...collections.map(async collection => {
                    console.log("fetch collections recipes cover")
                    let recipes: IRecipe[] = await Promise.all([...collection.recipes.map(async recipe => {
                        return await RecipeStore.getRecipe(recipe)
                    })]) as IRecipe[]
                    console.log("recipes: ", recipes)
                    collection.covers = recipes.map(recipe => recipe.imageCover).slice(0, 4)

                    console.log("collection with covers: ", collection)
                    return collection

                })]).then(collections => {
                    setCollections(collections)
                })

                // setCollections(data)
            })
        }
        fetchData()
    }, [])

    return (
        <HeaderMain>
            <View style={styles.container}>
                {showCollectionModal && <NewCollectionModal
                    visible={showCollectionModal}
                    modalClosed={(visible) => setShowCollectionModal(visible)}
                />}

                <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ alignItems: "center" }}>
                    <CircleButton label="New Collection" onPress={() => setShowCollectionModal(true)} />
                    <FlatList
                        data={collections}
                        renderItem={({ item }) => <CollectionCover
                            id={item.id}
                            title={item.title}
                            recipeCovers={item.covers ?? []} />}
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