import { View, StyleSheet, Text, Pressable, Modal, Dimensions } from "react-native";

interface ISheetMenuProps {
    children: React.ReactElement<ISheetMenuItemProps> | React.ReactElement<ISheetMenuItemProps>[]
    visible?: boolean;
    onClose?: () => false
}

type SheetMenuItemComponent = React.FunctionComponent<ISheetMenuItemProps>
type SheetMenuComponent = React.FunctionComponent<ISheetMenuProps> & { SheetMenuItem: SheetMenuItemComponent }

const { width } = Dimensions.get('window')

const SheetMenu: SheetMenuComponent = (props: ISheetMenuProps): JSX.Element => {

    return (
        <>
            {props.visible &&
                <View style={[SheetMenuStyles.centeredView, SheetMenuStyles.shadowBackground, { position: "absolute", bottom: 0 }]}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={props.visible}
                        onRequestClose={() => {
                            if (props.onClose)
                                props.onClose();
                        }}>
                        <View style={SheetMenuStyles.centeredView}>
                            <View style={SheetMenuStyles.modalView}>
                                {props.children}
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </>
    )
}

export interface ISheetMenuItemProps {
    children: string | string[]
    onPress?: () => void
}

const SheetMenuItem: SheetMenuItemComponent = (props: ISheetMenuItemProps): JSX.Element => {

    return (
        <Pressable style={SheetMenuItemStyles.menuItem} onPress={() => { if (props.onPress) props.onPress() }}>
            <Text style={SheetMenuItemStyles.menuItemText}>
                {props.children}
            </Text>
        </Pressable>
    )
}

SheetMenu.SheetMenuItem = SheetMenuItem

const SheetMenuStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    shadowBackground: {
        backgroundColor: "rgba(52,52,52,0,7)",

    },
    modalView: {
        margin: 20,
        marginBottom: -20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        alignSelf: "flex-end",
        height: 300,
        width: width * 0.95,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

const SheetMenuItemStyles = StyleSheet.create({
    menuItem: {
        flex: 1,
        flexDirection: "row",
        height: 70,
    },
    menuItemText: {
        fontSize: 25
    }
})

export default SheetMenu