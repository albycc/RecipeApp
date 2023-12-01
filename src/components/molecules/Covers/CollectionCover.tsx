import { View, StyleSheet, Text, Image } from "react-native"
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
        <View>
            <Link href={"/collections/" + props.id}>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.circle}>
                        {props.recipeCovers.map(recipe => <Icon src={recipe} width={150} height={150} />)}
                    </View>
                    <Text>{props.title}</Text>
                </View>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        borderRadius: 200,
        width: 300,
        height: 300,
        backgroundColor: ColourThemes.lightGrey,
        overflow: "hidden"
    },
    layoutCover: {

    }
})

export default CollectionCover