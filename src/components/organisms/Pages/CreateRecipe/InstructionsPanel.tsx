import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react"
import Card from "../../../../components/atoms/Card";
import InputText from "../../../atoms/Input/InputText";
import { ColourThemes } from "../../../../css/colours";
import { IRecipeInstruction } from "../../../../models/IRecipe";
import { generateNumberId } from "../../../../utils/idMathGen";
import OListItem from "../../../../components/atoms/Lists/Ordered/OListItem";

interface IProps {
    instructionsList: IRecipeInstruction[]
    setInstructionsList?: (list: IRecipeInstruction[]) => void
    editMode?: true;
}

function InstructionsPanel(props: IProps) {
    const [instructionsList, setInstructionsList] = useState<IRecipeInstruction[]>([])
    const [editInstruction, setEditInstruction] = useState<IRecipeInstruction | null>(null)

    useEffect(() => {

        setInstructionsList(props.instructionsList)
    }, [])

    const InstructionItem = (instruction: IRecipeInstruction, index: number) => {
        return (
            <OListItem nr={index}>
                {props.editMode ? (
                    <>
                        {editInstruction?.id === instruction.id ? (
                            <InputText
                                noBorder
                                textArea
                                defaultText={instruction.description}
                                numberOfLines={10}
                                onFocus={() => setEditInstruction({ ...instruction })}
                                onBlur={() => editInstructionText()}
                                onChange={(s) => {
                                    if (editInstruction) setEditInstruction({ ...editInstruction, description: s })
                                }
                                }
                            />
                        ) : (
                            <Pressable onPress={() => setEditInstruction(instruction)} style={{ width: "100%" }}>
                                <Text >{instruction.description}</Text>
                            </Pressable>
                        )
                        }
                    </>
                )
                    :
                    (
                        <Text >{instruction.description}</Text>
                    )
                }

            </OListItem>

        )
    }

    const editInstructionText = () => {
        if (editInstruction) {
            const index = instructionsList.findIndex(instruction => instruction.id === editInstruction.id)

            instructionsList[index] = editInstruction

            setInstructionsList(instructionsList)
            setEditInstruction(null)
            if (props.setInstructionsList)
                props.setInstructionsList(instructionsList)
        }
    }

    const newInstructionButtonHandler = () => {
        const instruction: IRecipeInstruction = { id: generateNumberId(), description: "", done: false }
        setInstructionsList([...instructionsList, instruction])
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


export default InstructionsPanel;