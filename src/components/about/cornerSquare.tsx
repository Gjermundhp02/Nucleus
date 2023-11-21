import GS from "@styles/globalStyles"
import React from "react"
import { useSelector } from "react-redux"
import { View } from "react-native"

type CornerSquareProps = {
    corner: number
    type?: boolean
}

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: "CATEGORY"
 * @returns Small circle of the categories color
 */
export default function CornerSquare({corner, type}: CornerSquareProps):
JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const horizontal = corner === 0 || corner === 2

    return (
        <View style={{position: "absolute", alignSelf: "center"}}>
            <View style={type 
                ? {
                    transform: [{ rotate: `${90 * corner}deg` }],
                    width: horizontal ? "100%" : undefined, 
                    height: horizontal ? undefined : "180%", 
                    aspectRatio: horizontal ? 1.5 : 0.66,
                    right: horizontal ? undefined : "40%",
                    bottom: horizontal ? undefined : "30.3%",
                }
                : {...GS.personImage, transform: [{ rotate: `${90 * corner}deg` }]}
            }>
                {/** ORANGE */}
                <View style={{width: 83, height: 13, backgroundColor: theme.orange}} />
                <View style={{width: 13, height: 70, backgroundColor: theme.orange}} />

                {/** DARK INSIDE */}
                <View style={{width: 13, height: 70, left: 13, top: -70, backgroundColor: theme.darker}} />
                <View style={{width: 70, height: 13, left: 13, top: -140, backgroundColor: theme.darker}} />

                {/** DARK EDGE BOTTOM */}
                <View style={{width: 26, height: 13, top: -83, backgroundColor: theme.darker}} />

                {/** DARK EDGE TOP */}
                <View style={{width: 13, height: 26, left: 83, top: -179, backgroundColor: theme.darker}} />
            </View>
        </View>
    )
}
