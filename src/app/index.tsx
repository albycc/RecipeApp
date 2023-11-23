import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useRecipeProvider } from '../state/RecipeContext';
import HeaderMain from '../components/templates/HeaderMain';
import { IRecipe } from '../models/IRecipe';
import RecipeCover from '../components/molecules/RecipeCover';
import CircleButton from '../components/atoms/CircleButton';
import CircleLink from '../components/atoms/Links/CircleLink';
import { RecipeStore } from '../store/store';
import { useEffect, useState } from 'react';

// const recipeData: IRecipe[] = [
//     { id: "3453-3g34-g54g-3453", name: "Chicken", nrPortions: 4, imageCover: "chicken.png", ingredients: [], instructions: [] },
//     { id: "43f4-34g4-f43w-34hd", name: "Chicken 2", nrPortions: 4, imageCover: "chicken.png", ingredients: [], instructions: [] },
//     { id: "2df4-hh45-b54f-35h5", name: "Chicken 3", nrPortions: 4, imageCover: "chicken.png", ingredients: [], instructions: [] },
// ]

export default function App() {
    const { state } = useRecipeProvider()
    const [recipes, setRecipes] = useState<IRecipe[]>([])

    console.log("state: ", state)

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

    return (
        <HeaderMain>
            <View style={styles.container}>
                <Text>Open up ggsgsdg</Text>
                <CircleLink href='/CreateRecipe' label='NEW RECIPE' />
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => <RecipeCover title={item.name} imageCover={item.imageCover} />}
                    keyExtractor={item => item.id}
                />
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
