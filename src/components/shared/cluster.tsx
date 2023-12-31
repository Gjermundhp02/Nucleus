import FetchColor from "@styles/fetchTheme"
import { View } from "react-native"
import { ClusterProps } from "@interfaces"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import React from "react"

/**
 * Card function for styling a div, displays a view containing curved
 * corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Cluster ({ noColor, marginVertical, marginHorizontal, 
children }: ClusterProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View style={{backgroundColor: !noColor
            ? FetchColor({theme, variable: "DARKER"})
            : ""
        }}>
            <View style={{
                ...ES.clusterContent, 
                marginVertical: marginVertical, 
                marginHorizontal: marginHorizontal
            }}>
                { children }
            </View>
        </View>
    )
}

/**
 * Smaller cluster function for styling a div, displays a view containing curved
 * corners with content inside
 * @param {*} props     Content to put inside the cluster
 * @returns             Cluster with the props inside
 */
export function ClusterSmaller ({children}: React.PropsWithChildren<{}>) {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View style={{
                ...ES.clusterSmaller,
                backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
            <View>
                { children }
            </View>
        </View>
    )
}
