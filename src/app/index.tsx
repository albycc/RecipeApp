import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { Link } from 'expo-router';
import { useRecipeProvider } from '../state/RecipeContext';
import HeaderMain from '../components/templates/HeaderMain';
import { IRecipe } from '../models/IRecipe';
import RecipeCover from '../components/molecules/RecipeCover';
import CircleLink from '../components/atoms/Links/CircleLink';
import { RecipeStore } from '../store/store';
import { useEffect, useState } from 'react';
import NewRecipeModal from '../components/organisms/Pages/MainPage/NewRecipeModal';
import CircleButton from '../components/atoms/Input/CircleButton';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/atoms/Input/Button';
import { router } from 'expo-router';
import { generateNumberId } from '../utils/idMathGen';

export default function App() {
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [showNewRecipeModal, setShowNewRecipeModal] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const recipeData: IRecipe[] = await RecipeStore.getRecipes()
            console.log("recipeData: ", recipeData)
            if (recipeData) {
                setRecipes(recipeData)
            }
        }
        fetchData()
    }, [])

    const deleteAllButtonHandler = () => {
        const deleteAll = async () => {
            await RecipeStore.removeItems()
            router.push("/")
        }

        deleteAll()
    }

    console.log("showNewRecipeModal: ", showNewRecipeModal)

    return (
        <HeaderMain>
            <View style={styles.container}>
                {showNewRecipeModal && <NewRecipeModal visible={showNewRecipeModal} modalClosed={(visible) => setShowNewRecipeModal(visible)} />}
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                        <CircleButton onPress={() => setShowNewRecipeModal(true)} label='NEW RECIPE' />

                    </View>

                    {recipes.map((item => <RecipeCover key={item.id} id={item.id} title={item.name} imageCover={item.imageCover} />))}
                    {/* <FlatList
                    data={recipes}
                    renderItem={({ item }) => <RecipeCover id={item.id} title={item.name} imageCover={item.imageCover} />}
                    keyExtractor={item => item.id}
                /> */}
                    <Button label="Delete all" onPress={deleteAllButtonHandler} />

                </ScrollView>
            </View>

        </HeaderMain>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
