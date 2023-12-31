import { Text, View, ScrollView, Dimensions } from "react-native"
import Notification from "@/components/settings/notification"
import ThemeSwitch from "@/components/settings/themeSwitch"
import Reminders from "@/components/settings/reminders"
import Language from "@/components/settings/language"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import en from "@text/settings/en.json"
import no from "@text/settings/no.json"
import T from "@styles/text"
import React from "react"

type ClusterWithSwitchProps = {
    obj: infoProps
    category: string
}

type infoProps = {
    title: string
    description?: string 
}

type ContentProps = {
    lang: boolean
}

export default function SettingScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <View style={{
                ...GS.content, 
                backgroundColor: FetchColor({theme, variable: "DARKER"})
            }}>
                <Content />
            </View>
        </View>
    )
}

function Content(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const info = lang ? no.info : en.info

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {Space(Dimensions.get("window").height/8.1)}
            <Cluster marginHorizontal={0}>
                <View style={GS.notificationBack}>
                    <View style={GS.view}>
                        <Text style={{
                            ...GS.notificationText, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {info[0].title}
                        </Text>
                        <Text style={{
                            ...GS.notificationTip, 
                            color: FetchColor({theme, 
                            variable: "OPPOSITETEXTCOLOR"})
                        }}>
                            {info[0].description}
                        </Text>
                    </View>
                    <View style={GS.view2}><ThemeSwitch/></View>
                </View>
            </Cluster>

            <Cluster>
                <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{
                        ...GS.notificationText, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {info[1].title}
                        </Text>
                    <Text style={{
                        ...GS.notificationTip, 
                        color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                        }}>
                            {info[1].description}
                        </Text>
                </View>
                    <Language/>
                </View>
            </Cluster>

            {Space(10)}
            <Text style={{
                ...T.text30, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                    {info[2].title}
            </Text>
            {Space(10)}

            <SwitchCluster obj={info[3]} category="IMPORTANT" />

            {Space(10)}
            <Text style={{
                ...T.text25, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                {info[4].title}
            </Text>
            {Space(10)}

            <SwitchCluster obj={info[5]}  category="BEDPRES" />
            <SwitchCluster obj={info[6]}  category="TEKKOM" />
            <SwitchCluster obj={info[7]}  category="CTF" />
            <SwitchCluster obj={info[8]}  category="SOCIAL" />
            <SwitchCluster obj={info[9]}  category="KARRIEREDAG" />
            <SwitchCluster obj={info[10]} category="FADDERUKA" />
            <SwitchCluster obj={info[11]} category="LOGIN" />
            <SwitchCluster obj={info[12]} category="ANNET" />

            {Space(10)}
            <Text style={{
                ...T.text25,
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
            }}>
                {info[13].title}
            </Text>
            {Space(10)}
            <Reminders/>
            {Space(8)}
            {Space((Dimensions.get("window").height/3))}
        </ScrollView>
    )
}

function SwitchCluster({obj, category}: ClusterWithSwitchProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Cluster>
            <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{
                        ...GS.notificationText, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {obj.title}
                    </Text>
                    <Text style={{
                        ...GS.notificationTip, 
                        color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                    }}>
                        {obj.description}
                    </Text>
                </View>
                <Notification category={category}/>
            </View>
            {Space(5)}
        </Cluster>
    )
}
