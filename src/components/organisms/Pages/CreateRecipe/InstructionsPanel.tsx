import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react"
import Card from "../../../../components/atoms/Card";
import InputText from "../../../../components/atoms/InputText";
import { ColourThemes } from "../../../../css/colours";

interface IProps {
    instructionsList: string[]
    setInstructionsList?: (list: string[]) => void
}

export type InstructionToEdit = {
    index: number;
    text: string;
}

function InstructionsPanel(props: IProps) {
    const [instructionsList, setInstructionsList] = useState<string[]>([])
    const [editInstruction, setEditInstruction] = useState<InstructionToEdit | null>(null)


    useEffect(() => {
        setInstructionsList(props.instructionsList)
    }, [])

    const InstructionItem = (instruction: string, index: number) => {
        return (
            <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
                <View style={styles.circleNrItem}>
                    <Text>{index + 1}</Text>
                </View>
                <Card>
                    {editInstruction?.index === index ? (
                        <InputText
                            noBorder
                            textArea
                            defaultText={instruction}
                            numberOfLines={10}
                            onFocus={() => setEditInstruction({ index, text: instruction })}
                            onBlur={() => editInstructionText()}
                            onChange={(s) => {
                                if (editInstruction) {
                                    setEditInstruction({ ...editInstruction, text: s })
                                }
                            }
                            }
                        />) :
                        (
                            <Pressable onPress={() => setEditInstruction({ index, text: instruction })} style={{ width: "100%" }}>
                                <Text>{instruction}</Text>
                            </Pressable>
                        )
                    }
                </Card>
            </View>
        )
    }

    const editInstructionText = () => {
        if (editInstruction) {
            instructionsList[editInstruction.index] = editInstruction.text

            setInstructionsList(instructionsList)
            setEditInstruction(null)
            if (props.setInstructionsList)
                props.setInstructionsList(instructionsList)
        }
    }

    const newInstructionButtonHandler = () => {
        setInstructionsList([...instructionsList, ""])
    }

    return (
        <View style={{ height: "100%" }}>
            <FlatList
                data={instructionsList}
                renderItem={({ item, index }) => InstructionItem(item, index)}
                scrollEnabled={false}
            />
            {props.setInstructionsList && (
                <Pressable onPress={newInstructionButtonHandler}>
                    <Card><Text>New instructions</Text></Card>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    circleNrItem: {
        borderRadius: 100,
        width: 50,
        height: 50,
        backgroundColor: ColourThemes.cyan,
        color: "grey",
        marginHorizontal: 5,
        margin: "auto"
    }
})

export default InstructionsPanel;