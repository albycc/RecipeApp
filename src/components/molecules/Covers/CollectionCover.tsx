import { View, StyleSheet, Text, Image, } from "react-native"
import { ColourThemes } from "../../../css/colours"
import { Link } from "expo-router";
import Icon from "../../../components/atoms/Icon";

type IProps = {
    id: string
    title: string
    recipeCovers: string[]
}

function CollectionCover(props: IProps) {
    return (
        <View style={styles.coverContainer}>
            <Link href={"/collections/" + props.id}>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.circle}>
                        {props.recipeCovers.map((recipe, index) => (
                            <View key={index} style={{ borderWidth: 1, borderColor: "white" }}>
                                <Icon src={recipe} width={150} height={150} />
                            </View>
                        ))}
                    </View>
                    <Text style={styles.coverTitle}>{props.title}</Text>
                </View>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    coverContainer: {
        flex: 1,
        marginBottom: 20,
    },
    circle: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 200,
        width: 304,
        height: 304,
        backgroundColor: ColourThemes.lightGrey,
        overflow: "hidden"
    },
    coverTitle: {
        fontSize: 25
    }

})

export default CollectionCover