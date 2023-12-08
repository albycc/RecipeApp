import { View, Text } from "react-native"
import ModalWindow from "../../../../components/atoms/modal/ModalWindow";
import InputText from "../../../atoms/Input/InputText";
import Button from "../../../atoms/Input/Button";
import react, { useState } from "react"
import uuid from 'react-native-uuid';
import { IRecipe } from "../../../../models/IRecipe";
import { RecipeStore } from "../../../../store/recipeStore";
import { router } from "expo-router";

interface IProps {
    visible?: boolean;
    modalClosed: (visible: boolean) => void
}

function NewRecipeModal(props: IProps) {
    const [name, setName] = useState<string>("")

    const createNewRecipeHandler = () => {
        const newRecipe: IRecipe = {
            id: uuid.v4() as string,
            name,
            time: 10,
            imageCover: "chicken.png",
            nrPortions: 4,
            ingredients: [],
            instructions: []
        }

        RecipeStore.setRecipe(newRecipe).then(data => {
            if (data === "success") {
                router.push("/recipe/" + newRecipe.id)
            }
        })

    }
    return (
        <ModalWindow visible={props.visible} modalClosed={props.modalClosed}>
            <Text>Herro</Text>
            <InputText onChange={(v) => setName(v)} />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button label="Cancel" onPress={() => props.modalClosed(false)} />
                <Button label="Create" onPress={() => createNewRecipeHandler()} disabled={name === ""} />
            </View>

        </ModalWindow>
    )

}

export default NewRecipeModal