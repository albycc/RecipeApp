import { View, ScrollView, StyleSheet, FlatList, Text, Pressable } from "react-native";
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
import LogoBack from "../../assets/icons/left-arrow.svg"
import MoreEdit from "../../assets/icons/threedots.svg"
import SheetMenu from "../../components/atoms/menu/SheetMenu";
import EditCollectionModal from "../../components/organisms/Pages/Collections/EditCollectionModal";

function CollectionPage() {
    const { id } = useLocalSearchParams()
    const [collection, setCollection] = useState<ICollection | null>(null)
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [showAddRecipeModal, setShowAddRecipeModal] = useState<boolean>(false)
    const [showMoreSheetMenu, setShowMoreSheetMenu] = useState<boolean>(false)
    const [showEditRecipeModal, setShowEditRecipeModal] = useState<boolean>(false)

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

                setRecipes(recipes)
            }
        })
    }

    const editCollection = async (collectionToEdit: ICollection) => {
        await CollectionStore.editCollection(collectionToEdit).then(async response => {
            if (response === "success") {
                setShowEditRecipeModal(false)
                setCollection(collectionToEdit)
            }
        })

    }

    console.log("showEditRecipeModal: ", showEditRecipeModal)

    return (
        <View style={{ flex: 1 }}>

            <SheetMenu visible={showMoreSheetMenu}>
                <SheetMenu.SheetMenuItem onPress={() => {
                    setShowMoreSheetMenu(false)
                    setTimeout(() => {
                        setShowEditRecipeModal(true)

                    }, 700)

                }} >Edit</SheetMenu.SheetMenuItem>
                <SheetMenu.SheetMenuItem onPress={() => { console.log("close"); setShowMoreSheetMenu(false) }}>Close</SheetMenu.SheetMenuItem>
            </SheetMenu>
            {collection && <AddRecipeToCollectionModal
                visible={showAddRecipeModal}
                onClose={() => setShowAddRecipeModal(false)}
                collection={collection}
            />}
            {collection && (
                <EditCollectionModal
                    visible={showEditRecipeModal}
                    collection={collection}
                    onClose={() => setShowEditRecipeModal(false)}
                    onDone={(collection) => editCollection({ ...collection })}
                />
            )}

            <View style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.menuRow}>

                        <LogoBack width={40} height={40} onPress={() => router.back()} />
                        {collection && <Text style={{ fontSize: 25 }}>{collection.title}</Text>}
                        <MoreEdit width={40} height={40} onPress={() => setShowMoreSheetMenu(true)} />
                    </View>
                </View>

                <ScrollView style={{ width: "90%", }}>
                    <View style={{ flex: 1, flexDirection: "row", minHeight: 100, marginTop: 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 20 }}>{collection?.description}</Text>
                    </View>
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) => (
                            <View style={{ width: "50%", margin: 5 }}>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: "white",
        height: 50,
        width: "100%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        zIndex: 10
    },
    menuRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"

    },
    listContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default CollectionPage