import { View, StyleSheet } from "react-native";
import React from "react";

export interface ITabProps {
    children: React.ReactNode | React.ReactNode[];
    tabName: string;
}

function Tab({ children }: ITabProps) {
    return (
        <View>
            {children}

        </View>
    )
}

export default Tab