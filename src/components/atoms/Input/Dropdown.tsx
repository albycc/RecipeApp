import { View, Text, StyleSheet, Pressable } from "react-native";
import react, { useState, useEffect } from "react"
import { IMeasure } from "../../../models/IRecipe";

interface IProps {
    options?: IOption[]
    valueSelected?: (option: IOption) => void
    value?: string;
}

export type IOption = {
    label: string;
    value: string
}

function Dropdown(props: IProps) {
    const [openDropdownMenu, setOpenDropdownMenu] = useState<boolean>(false)
    const [chosenValue, setChosenValue] = useState<IOption | null>(null)

    useEffect(() => {
        if (props.value && props.options) {
            const optionFound = props.options.find(option => option.value === props.value)
            if (optionFound)
                setChosenValue(optionFound)
        }

    }, [props.value])

    const DropdownItem = (option: IMeasure) => {
        return (
            <Pressable key={option.value} style={styles.optionItem} onPress={() => {
                setChosenValue(option);
                if (props.valueSelected)
                    props.valueSelected(option)
                setOpenDropdownMenu(false)
            }}>
                <View>
                    <Text key={option.value} style={{ fontSize: 20 }}>{option.label}</Text>

                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.dropdownLayout}>
            <View style={styles.box}>
                <Pressable onPress={() => { console.log("open"), setOpenDropdownMenu(!openDropdownMenu) }}>
                    <Text style={{ fontSize: 20 }}>{chosenValue ? chosenValue.label : "Select"}</Text>
                </Pressable>
            </View>
            {openDropdownMenu && <View style={styles.optionsMenu}>
                {props.options && props.options.map(option => DropdownItem(option))}
            </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    dropdownLayout: {
        position: "relative",
        minWidth: 100,
    },
    box: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 5,
        width: "100%",
        backgroundColor: "white"
    },
    optionsMenu: {
        position: "absolute",
        top: 36,
        left: 0,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        padding: 5,
        minHeight: 50,
        width: "100%",
        backgroundColor: "white",
        zIndex: 900

    },
    optionItem: {
        width: "100%",
        paddingVertical: 2,
    }
})

export default Dropdown