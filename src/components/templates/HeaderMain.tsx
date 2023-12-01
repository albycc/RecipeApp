import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Slot } from "expo-router"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import { Link, router, usePathname } from "expo-router"
import { useEffect, useState } from "react"

interface IProps {
    children?: JSX.Element | JSX.Element[]
}

type ILink = {
    href: string;
    label: string;
    active: boolean
}

function HeaderMain({ children }: IProps) {
    const path = usePathname()


    console.log("router: ", path)
    return <SafeAreaProvider style={{ flex: 1, backgroundColor: "darkblue" }}>
        <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
            <View style={styles.baseLayout}>

                <View style={styles.header}>
                    <Link href="/" style={[styles.link, path === "/" && styles.linkActive]}>RECIPES</Link>
                    <Link href="/collections" style={[styles.link, path === "/collections" && styles.linkActive]}>COLLECTIONS</Link>

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
        backgroundColor: "white"
    },
    link: {
        fontSize: 20,
        marginHorizontal: 5
    },
    linkActive: {
        textDecorationLine: "underline",
    },
    main: {
        flex: 10,
        backgroundColor: "white"
    }

})


export default HeaderMain