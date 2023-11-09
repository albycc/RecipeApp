import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { View } from "react-native"
import { StyleSheet } from "react-native"

interface IProps {
    children?: JSX.Element
}

function HeaderMain({ children }: IProps) {
    return <SafeAreaProvider style={{ flex: 1, backgroundColor: "darkblue" }}>
        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
            <View style={styles.baseLayout}>

                <View style={styles.header}>

                </View>
                <View style={styles.main}>
                    {children}

                </View>
            </View>

        </SafeAreaView>

    </SafeAreaProvider>
}

const styles = StyleSheet.create({
    baseLayout: {
        flex: 1,
        backgroundColor: "green"
    },
    header: {
        flex: 1,
        height: 100
    },
    main: {
        flex: 10,
    }

})


export default HeaderMain