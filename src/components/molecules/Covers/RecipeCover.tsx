import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import Icon from "../../atoms/Icon";
import { Link } from "expo-router";

interface IProps {
    id: string
    imageCover: string;
    title: string;
    time?: number;
    scale?: number;
}
const { width, height } = Dimensions.get('window')

function RecipeCover(props: IProps) {

    return (
        <View style={styles.coverLayout}>
            <Link href={"/recipe/" + props.id} style={styles.link}>
                <View style={styles.coverLayout}>
                    <View style={{ width: props.scale ? props.scale * width : width, height: 250 }}>
                        <Image source={require("../../../assets/chicken.png")} style={styles.coverImage} resizeMode={"cover"} />
                    </View>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    coverLayout: {
        flex: 1,
        height: 300,
        marginBottom: 20,
        marginHorizontal: 5,
        width: "100%",
        backgroundColor: "pink"
    },
    link: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: "green",
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: "grey",
        overflow: "hidden"
    },
    coverImage: {
        flex: 1,
        width: "100%",
        resizeMode: "cover"
    },
    title: {
        flex: 1,
        fontSize: 20
    }
})

export default RecipeCover