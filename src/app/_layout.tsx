import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { RecipeProvider } from '../state/RecipeContext';

function BaseLayout() {
    return (
        <RecipeProvider>

            <SafeAreaProvider style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>
                    <Slot />

                </SafeAreaView>

            </SafeAreaProvider>
        </RecipeProvider>
    )
}

export default BaseLayout