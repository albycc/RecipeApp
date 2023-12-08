import { View, StyleSheet, Text } from "react-native"
import ModalWindow from "../../../../components/atoms/modal/ModalWindow";
import InputText from "../../../../components/atoms/Input/InputText";
import Button from "../../../../components/atoms/Input/Button";
import { useEffect, useState } from "react";
import { ICollection } from "../../../../models/ICollection";

interface IProps {
    visible: boolean;
    onClose: () => void;
    collection: ICollection;
    onDone: (c: ICollection) => void

}

function EditCollectionModal(props: IProps) {

    const [collectionToEdit, setCollectionToEdit] = useState<ICollection | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        setCollectionToEdit(props.collection)

    }, [props.collection])

    useEffect(() => {
        if (collectionToEdit !== null) {
            setDisabled(collectionToEdit.title === "")
        }

    }, [collectionToEdit])


    return (
        <>
            {collectionToEdit && <ModalWindow visible={props.visible} onClose={() => props.onClose}>
                <View style={{ height: "80%", width: 250 }}>
                    <Text style={{ fontSize: 30 }}>Edit {props.collection.title}</Text>
                    <View style={styles.modalItemGroup}>
                        <Text style={{ fontSize: 20 }}>Collection title</Text>
                        <InputText defaultText={props.collection.title} onChange={(title) => setCollectionToEdit({ ...collectionToEdit, title })} />
                    </View>
                    <View style={styles.modalItemGroup}>
                        <Text style={{ fontSize: 20 }}>Collection description</Text>
                        <InputText
                            defaultText={props.collection.description}
                            onChange={(description) => setCollectionToEdit({ ...collectionToEdit, description })}
                            textArea={true}
                            numberOfLines={4}

                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Button label="Cancel" onPress={() => props.onClose()} />
                    <Button label="Update" onPress={() => props.onDone(collectionToEdit)} disabled={disabled} />
                </View>
            </ModalWindow>}
        </>
    )
}

const styles = StyleSheet.create({
    modalItemGroup: {
        marginVertical: 10
    }


})

export default EditCollectionModal