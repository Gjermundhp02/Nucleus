import CategorySquare, { CategoryCircle } from "@/components/shared/category"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EventLocation from "@components/event/eventLocation"
import { FetchJoinLink } from "@/utils/fetch"
import Space, { Month } from "@/components/shared/utils"
import { CardSmaller } from "@/components/shared/card"
import { GetEndTime } from "@components/event/time"
import React, { useEffect, useState } from "react"
import RenderHTML from "react-native-render-html"
import EventTime from "@components/event/time"
import FetchColor from "@styles/fetchTheme"
import Card from "@/components/shared/card"
import { SvgUri } from "react-native-svg"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import {
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  Image,
  View,
  Text,
} from "react-native"
import { StaticImage } from "@/components/about/social"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

type handleLinkProps = {
    mazeref: string
    street: string
    organizer: string
}

type JoinButtonProps = {
    link: string
    updateStorage: () => Promise<void>
}

type MapProps = {
    event: DetailedEventProps | EventProps
    handleLink: ({mazeref, street, organizer}: handleLinkProps) => void
}

type CategoryProps = {
    item: EventProps
}

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen({ route }: 
BottomTabScreenProps<EventStackParamList>): JSX.Element {

    if(!route.params){return <></>}

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const item = route.params.item
    let link

    const [event, setEvent]=useState<DetailedEventProps | EventProps>(item)

    const getData=()=>{
        fetch("https://api.login.no/events/" + item.eventID)
        // fetch("https://tekkom:rottejakt45@api.login.no:8443") //TESTING
        .then(response => response.json())
        .then(data=>setEvent(data))
    }
    

    if ("description" in event) {
        link = FetchJoinLink(event.description)
    }
    
    useEffect(() => { getData() }, [item])
    
    async function updateStorage() {
        let stored = await AsyncStorage.getItem("clickedEvents")
        let storedClickedEvents = stored ? JSON.parse(stored) : []
        if (storedClickedEvents) {
            storedClickedEvents.push(item)
            await AsyncStorage.setItem("clickedEvents", 
            JSON.stringify(storedClickedEvents))
        } else {
            await AsyncStorage.setItem("clickedEvents", 
            JSON.stringify([item]))
        }
    }

    function handleLink({mazeref, street, organizer}: handleLinkProps) {
        if (mazeref.length) {
            Linking.openURL(`https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=${mazeref}`).catch(() => {
                Alert.alert("Mazemap kunne ikke åpnes", `Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: M${mazeref}`)
            })
            return
        }

        if (street === "Orgkollektivet") {
            Linking.openURL("https://link.mazemap.com/tBlfH1oY").catch(() =>{
                Alert.alert("Mazemap kunne ikke åpnes", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: wZDe8byp")
            })
        }

        if (organizer === "HUSET") {
            Linking.openURL("https://link.mazemap.com/O1OdhRU4").catch(() => {
                Alert.alert("Mazemap kunne ikke åpnes.", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: MGfrIBrd")
            })
        }
    }

    const textNO = {
        start: "Starter:      ",
        end: "Slutter:       ",
        host: "Arrangør:   ",
        more: "Mer info"
    }

    const textEN = {
        start: "Starts:         ",
        end: "Ends:           ",
        host: "Organizer:   ",
        more: "More info"
    }

    const text = lang ? textNO : textEN

  return (
    <View>
        <View style={{...ES.sesContent, backgroundColor: FetchColor({theme, variable: "BACKGROUND"})}}>
            <ScrollView showsVerticalScrollIndicator={false}>

            {Space((Dimensions.get("window").height/8)-5)}

            {(item.image).includes(".svg") ?
                <SvgUri
                    style={{alignSelf: "center"}}
                    width={(Dimensions.get("window").width)/1.2}
                    height={Dimensions.get("window").width/3}
                    uri={`https://cdn.login.no/img/events/${item.image}`}
                />
            : (item.image).includes(".png") ? <Image 
                style={ES.specificEventImage}
                source={{uri: `https://cdn.login.no/img/events/${item.image}`}}
            />:<StaticImage item={item} />}
            {Space(10)}

            <CardSmaller>
                <View style={ES.specificEventInfoView}>
                    <Card>
                        <View style={{left: -10}}>

                        <CategorySquare category={item.category} />
                        <Text style={{
                            ...ES.eventCardDayText, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {item.startt[8]}
                            {item.startt[9]}
                        </Text>

                        <Text style={{
                            ...ES.monthText, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                        <Month
                            month={parseInt(item.startt[5] + item.startt[6])}
                            color={FetchColor({theme, variable: "TEXTCOLOR"})}
                        />
                        </Text>
                        </View>
                    </Card>
                    <Text>
                        {EventTime({startTime: item.startt, 
                            endTime: "endt" in event ? event.endt : ""})}
                    </Text>
                </View>
            </CardSmaller>

                {Space(5)}
            <Card>
                <View style={ES.specificEventInfoView}>
                    <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {text.start}
                    </Text>
                    <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                    {item.startt[11]}{item.startt[12]}:{item.startt[14]}
                    {item.startt[15]}
                    </Text>
                </View>

                {Space(5)}

                <View style={ES.specificEventInfoView}>
                    <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {text.end}
                    </Text>
                    {"endt" in event && GetEndTime({input: event.endt, theme, lang})}
                </View>

                {Space(5)}

                <View style={{flexDirection: "row"}}>
                    <EventLocation
                        room={event.roomno}
                        campus={event.campus}
                        street={event.street}
                    />

                    <Map
                        event={event}
                        handleLink={handleLink}
                    />
                </View>

                {Space(5)}
                <Category item={item} />
                {Space(5)}

                <View style={ES.specificEventInfoView}>
                    <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {text.host}
                    </Text>
                    <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {item.organizer}{("organizerlink" in event && 
                        event.organizerlink) || event.discordlink 
                        || event.fblink ? " - ":null}
                    </Text>
                    {event.discordlink ?
                    <TouchableOpacity style={{minWidth: 70}} onPress={() => 
                    {Linking.openURL(`${item.discordlink}`)}}>
                            <View style={ES.row}>
                                <Text style={{
                                    ...T.mazemap, 
                                    color: FetchColor({theme, variable: "ORANGE"})
                                }}>
                                    Discord
                                </Text>
                            </View>
                        </TouchableOpacity>
                    :null}
                    {event.fblink && !event.discordlink ?
                    <TouchableOpacity 
                        style={{minWidth: 70}} 
                        onPress={() => {
                            Linking.openURL(`${event.discordlink}`)
                        }}>
                            <View style={ES.row}>
                                <Text style={{
                                    ...T.mazemap, 
                                    color: FetchColor({theme, variable: "ORANGE"})
                                }}>
                                    Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>
                    :null}
                    {("organizerlink" in event && event.organizerlink) && (event.discordlink || event.fblink) ?
                    <Text style={{...T.specificEventInfo, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{" - "}</Text>:null}
                    {("organizerlink" in event) && event.organizerlink ?
                    <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${event.organizerlink}`)}}>
                            <View style={ES.row}>
                                <Text style={{
                                    ...T.mazemap, 
                                    color: FetchColor({theme, variable: "ORANGE"})
                                }}>
                                    {text.more}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    :null}
                </View>
            </Card>

            {Space(5)}
                <Card>
                    <View>
                        {Space(5)}
                        <Text style={{
                            ...T.centered20, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {item.eventname}
                        </Text>
                    </View>
                    {Space(5)}
                    {"description" in event && event.description &&
                        <RenderHTML
                            baseStyle={{
                                maxWidth: "100%",
                                color: FetchColor({theme, variable: "TEXTCOLOR"}),
                            }}
                            contentWidth={0}
                            source={{html: event.description}}
                        />
                    }
                    {Space(10)}
                    <JoinButton
                        link={link ? link : ""}
                        updateStorage={updateStorage}
                    />
                </Card>
                {Space(10)}
                {Space(Dimensions.get("window").height/3)}
            </ScrollView>
        </View>
    </View>
  )
}

function JoinButton({link, updateStorage}: JoinButtonProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    
    if (link.length) {
        return (
            <TouchableOpacity onPress={() => {
                updateStorage()
                Linking.openURL(link)
            }}>
                <View style={{
                    ...ES.eventButton, 
                    backgroundColor: FetchColor({theme, variable: "ORANGE"})
                }}>
                    <Text style={{
                        ...T.centered20, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {lang ? "Meld meg på":"Join event"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

function Category({item}: CategoryProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return (
        <View style={ES.specificEventInfoView}>
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {lang ? "Kategori:      " : "Category:      "}
            </Text>
            {CategoryCircle(item.category)}
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {item.category}
            </Text>
        </View>
    )
}

function Map({event, handleLink}: MapProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    if (("mazeref" in event) && event.mazeref || (event.street === 
        "Orgkollektivet" || event.organizer === "HUSET")) {
        return (
            <TouchableOpacity 
                style={{minWidth: 70}} 
                onPress={() => {handleLink({mazeref: "mazeref" in event 
                    ? event.mazeref 
                    : "", 
                street: event.street, organizer: event.organizer})}}>
                <View style={ES.row}>
                    <Text 
                        style={{
                            ...T.specificEventInfo, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {" - "}
                        </Text>
                    <Text 
                        style={{
                            ...T.mazemap, 
                            color: FetchColor({theme, variable: "ORANGE"})
                        }}>
                                {lang ? "Kart" : "Map"}
                    </Text>
                    <Image 
                        style={ES.mazemapIcon} 
                        source={require("@assets/icons/mazemap.png")}/>
                </View>
            </TouchableOpacity>
        )
    }
}
