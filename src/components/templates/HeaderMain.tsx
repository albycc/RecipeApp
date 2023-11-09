import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import { Link } from "expo-router"

interface IProps {
    children?: JSX.Element
}

function HeaderMain({ children }: IProps) {
    return <SafeAreaProvider style={{ flex: 1, backgroundColor: "darkblue" }}>
        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
            <View style={styles.baseLayout}>

                <View style={styles.header}>
                    <Link href="/">RECIPES</Link>
                    <Link href="/Collection" >COLLECTIONS</Link>

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
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        backgroundColor: "green"
    },
    main: {
        flex: 10,
        backgroundColor: "white"
    }

})


export default HeaderMain