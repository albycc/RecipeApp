import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { RecipeProvider, useRecipeProvider } from '../state/RecipeContext';


export default function App() {
    const { state } = useRecipeProvider()

    console.log("state: ", state)

    return (
        <RecipeProvider>
            <View style={styles.container}>
                <Text>Open up App.tsx</Text>
                <Link href="/create-recipe">Create</Link>
                <FlatList data={state.recipes} renderItem={({ item }) => <Text>{item.name}</Text>} keyExtractor={recipe => recipe.id} />
            </View>
        </RecipeProvider>
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
