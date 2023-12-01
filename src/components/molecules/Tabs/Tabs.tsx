import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react"
import TabButton from "./TabButton";
import React, { Children, PropsWithChildren } from "react"
import { ITabProps } from "./Tab";

interface IProps {
    children: React.ReactElement<ITabProps>[]
}

function Tabs({ children }: IProps) {
    const [activeTab, setActiveTab] = useState<string>("")
    const [tabElement, setTabElement] = useState<React.ReactNode | null>(null)


    useEffect(() => {
        setActiveTab(children[0].props.tabName)
    }, [])

    useEffect(() => {
        setTabElement(children.find(tab => tab.props.tabName === activeTab))

    }, [activeTab])

    const onButtonPress = (title: string) => {
        setActiveTab(title)

    }

    return (
        <View >

            <View style={styles.buttonGrp}>
                {Children.map(children, ({ props }, index) => <TabButton key={`tab-button.${index}`} title={props.tabName} active={props.tabName === activeTab} onPress={onButtonPress} />)}
            </View>
            <View >
                {tabElement}

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonGrp: {
        flexDirection: "row",
        justifyContent: "center",
    }

})

export default Tabs