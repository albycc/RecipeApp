import { View, StyleSheet, Text, Image } from "react-native";
import Icon from "../atoms/Icon";
import { Link } from "expo-router";

interface IProps {
    id: string
    imageCover: string;
    title: string;
    time?: number;
}

function RecipeCover({ id, imageCover, title }: IProps) {

    return (
        <View style={styles.coverLayout}>
            <Link href={"/recipe/" + id} style={styles.link}>
                <View style={styles.coverLayout}>
                    <Icon src={imageCover} height={280} />
                    <Text style={styles.title}>{title}</Text>

                </View>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    coverLayout: {
        flex: 1,
        height: 300,
        width: 350,
        marginBottom: 20,
    },
    link: {
        flex: 1,
        height: "100%",

    },
    coverImage: {
        flex: 6
    },
    title: {
        flex: 1,
        fontSize: 20
    }

})

export default RecipeCover