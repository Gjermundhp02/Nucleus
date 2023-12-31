import { Image, View, Text, TouchableOpacity } from "react-native"
import FetchColor from "@styles/fetchTheme"
import PS from "@styles/profileStyles"
import CS from "@styles/clusterStyles"
import { Navigation } from "@interfaces"
import T from "@styles/text"
import React from "react"
import { useSelector } from "react-redux"

type SmallProfileProps = {
    navigation: Navigation
    profile: ProfileProps
    login: boolean
}

/**
 * Function for drawing a very small square of the category of the event
 *
 * @param {string} category    Category of the event, Format: "CATEGORY"
 * @returns                     Small circle of the categories color
 */
export default function SmallProfile({navigation, profile, login}:
SmallProfileProps): JSX.Element {  // SVG showing the color of the category

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    return (
        <TouchableOpacity onPress={() => login
            ? navigation.navigate("ProfileScreen")
            : navigation.navigate("LoginScreen")}
        >
            <View style={PS.profileBackground}>
                <View style={PS.smallProfileLeftTriplet}>
                    <View style={PS.smallProfileImageView}>
                        <Image
                            style={PS.smallProfileImage}
                            source={profile.image
                                ? {uri: profile.image}
                                : isDark
                                    ? require("@assets/icons/loginperson-white.png")
                                    : require("@assets/icons/loginperson-black.png")}
                        />
                    </View>
                </View>
                <View style={PS.smallProfileMiddleTriplet}>
                    {typeof profile.id === "number" ?
                        <>
                            <Text style={{
                                ...T.text20,
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {profile.name}
                            </Text>
                            <Text style={{
                                ...T.text15,
                                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                            }}>
                                {lang ? "Vis profil" : "Show profile"}
                            </Text>
                        </>
                    :
                        <Text style={{
                            ...T.text25,
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            Login
                        </Text>
                    }
                </View>
                <View style={PS.smallProfileRightTriplet}>
                    <Image
                        style={CS.arrowImage}
                        source={require("@assets/icons/dropdownBase.png")}
                    />
                </View>
            </View>
        </TouchableOpacity>
        )
}
