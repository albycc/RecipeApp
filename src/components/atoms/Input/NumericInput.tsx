import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import IconUp from "../../../assets/icons/up-arrow.svg"
import IconDown from "../../../assets/icons/down-arrow.svg"
import { useState, useEffect } from "react";


interface IProps {
    minLimit?: number
    maxLimit?: number
    initValue?: number;
    value?: number
    onChange?: (value: number) => void;
    incrementValue?: number;
}

function NumericInput(props: IProps) {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        if (props.initValue)
            setCount(props.initValue)

    }, [props.initValue])

    useEffect(() => {
        if (props.value)
            setCount(props.value)
    }, [props.value])

    const increment = () => {
        let newCount = count + (props.incrementValue ?? 1)
        if (props.maxLimit && newCount > props.maxLimit) {
            setCount(props.maxLimit)
            return
        }
        setCount(newCount)
        if (props.onChange)
            props.onChange(newCount)
    }

    const decrement = () => {
        let newCount = count - (props.incrementValue ?? 1)
        if (props.minLimit && newCount < props.minLimit) {
            setCount(props.minLimit)
            return
        }
        setCount(newCount)
        if (props.onChange)
            props.onChange(newCount)
    }

    const onChangeHandler = (value: string) => {
        let newCount = +value
        if (isNaN(newCount))
            newCount = 0
        if (props.maxLimit && newCount > props.maxLimit) {
            setCount(props.maxLimit)
            return
        }
        if (props.minLimit && newCount < props.minLimit) {
            setCount(props.minLimit)
            return
        }
        setCount(+value)
    }

    const onBlurHandler = () => {
        if (props.onChange)
            props.onChange(count)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                keyboardType={"numeric"}
                onChangeText={(s) => onChangeHandler(s)}
                onBlur={onBlurHandler}
                value={count.toString()}
            />
            <View>
                <IconUp width={20} height={15} onPress={increment} />
                <IconDown width={20} height={15} onPress={decrement} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row"
    },
    input: {
        minWidth: 40,
        height: 30,
        backgroundColor: "white"
    }
})

export default NumericInput