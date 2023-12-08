import { View, Text } from "react-native";
import ModalWindow from "../../../../components/atoms/modal/ModalWindow";
import InputText from "../../../../components/atoms/Input/InputText";
import Button from "../../../../components/atoms/Input/Button";
import { useState } from "react";
import { ICollection } from "../../../../models/ICollection";
import uuid from 'react-native-uuid';
import { CollectionStore } from "../../../../store/collectionStore";
import { router } from "expo-router";

interface IProps {
    visible?: boolean;
    onClose: () => void
}

function NewCollectionModal(props: IProps) {
    const [collectionName, setCollectionName] = useState<string>("")

    const createNewCollection = () => {
        const collection: ICollection = {
            id: uuid.v4() as string,
            title: collectionName,
            recipes: []
        }

        console.log("collection: ", collection)

        CollectionStore.setCollection(collection).then(response => {
            if (response) {
                router.push("/collections/" + collection.id)
            }
        })
    }
    return (
        <ModalWindow visible={props.visible} onClose={() => props.onClose}>
            <Text>New Collection</Text>
            <InputText onChange={(s) => setCollectionName(s)} />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button label="Cancel" onPress={() => props.onClose()} />
                <Button label="Create" onPress={() => createNewCollection()} disabled={collectionName === ""} />
            </View>

        </ModalWindow>
    )
}

export default NewCollectionModal