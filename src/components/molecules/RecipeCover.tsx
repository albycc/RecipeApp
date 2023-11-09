import { View, StyleSheet, Text } from "react-native";
import Icon from "../atoms/Icon";

interface IProps {
    imageCover: string;
    title?: string;
    time?: number;
}

function RecipeCover({ imageCover, title }: IProps) {
    console.log(title)
    return (
        <View style={styles.coverLayout}>
            <Icon src={imageCover} height={280} />
            <Text style={styles.title}>{title}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    coverLayout: {
        flex: 1,
        height: 300,
        width: 350,
        marginBottom: 20
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