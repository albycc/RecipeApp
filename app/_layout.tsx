import { Slot } from "expo-router"
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function AppLayout() {
    return <>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "darkblue" }}>
            <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
                <View style={styles.layout}>

                    <View style={styles.header}><Text>Header</Text></View>

                    <View style={styles.main}>

                        <Slot />
                    </View>
                    <View style={styles.footer}><Text>Footer</Text></View>
                </View>

            </SafeAreaView>

        </SafeAreaProvider>

    </>
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: "green"
    },
    main: {
        flex: 8,
        backgroundColor: "red"
    },
    footer: {
        flex: 1,
        backgroundColor: "yellow"
    }
})

export default AppLayout