import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";

interface IProps {
    children?: React.ReactNode | React.ReactNode[];
    visible?: boolean;
    onClose?: () => void
}

function ModalWindow(props: IProps) {

    useEffect(() => { if (props.onClose) props.onClose() }, [props.visible])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centered}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => { if (props.onClose) props.onClose() }}>
                            <Text style={{ fontSize: 20 }}>X</Text>
                        </Pressable>
                    </View>
                    <View style={styles.modalMain}>
                        {props.children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    shadow: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "grey"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 30,
    },
    modalMain: {
        marginTop: 10
    }
})

export default ModalWindow