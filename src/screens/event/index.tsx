import AsyncStorage from "@react-native-async-storage/async-storage"
import { ErrorMessage } from "@/components/shared/utils"
import storeEvents from "@/utils/storeEvents"
import React, { useEffect, useState, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import EventList from "@components/event/eventList"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import NavigateFromPushNotification 
from "@/utils/navigateFromPushNotification"
import initializeNotifications 
from "@/utils/notificationSetup"
import Filter, {
    fetchRelevantCategories,
    filterCategories,
    filterBoth,
    FilterUI,
} from "@/components/shared/filter"
import LastFetch, { fetchState, fetchStored, getData } from "@/utils/fetch"
import { View, StatusBar as StatusBarReact } from "react-native"
import { ExtendedRouteOptions, ExtendedStackRouteOptions, ScreenProps } from "@interfaces"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import LogoNavigation from "@/components/shared/logoNavigation"
import FilterButton from "@/components/shared/filterButton"
import DownloadButton from "@/components/shared/downloadButton"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificEventScreen from "./specificEvent"
import Header from "@components/nav/header"

const EventStack = createStackNavigator<EventStackParamList>()

/**
 * Parent EventScreen function
 *
 * Handles:
 * - Displaying events
 * - Filtering events
 * - Notification Management
 * - Event notifications, both scheduling and cancelling
 *
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */
export default function EventScreen({ navigation }: ScreenProps): JSX.Element {
    // Clicked events
    const [clickedEvents, setClickedEvents] = useState<EventProps[]>([])
    // Clicked categories
    const [clickedCategory, setClickedCategory] = useState<CategoryWithID[]>([])
    // Download state
    const date = new Date()
    date.setSeconds(date.getSeconds()-1)
    const [downloadState, setDownloadState] = useState(date)
    // Events from api
    const [events, setEvents] = useState<EventProps[]>([])
    // Filter text input declaration
    const [input, setInput] = useState("")
    // Last time API was fetched successfully
    const [lastSave, setLastSave] = useState("")
    // Push notification
    const [pushNotification, setPushNotification] = useState(false)
    const [pushNotificationContent, setPushNotificationContent] = 
        useState<JSX.Element | undefined>(undefined)
    // Notification state
    const [shouldSetupNotifications, setShouldSetupNotifications] = useState(true)
    // Relevant categories to filter
    const [relevantCategories, setRelevantCategories] = 
    useState<CategoryWithID[]>([])
    // Events currently displayed
    const [renderedArray, setRenderedArray] = useState<EventProps[]>([])
    // Clears text input
    const textInputRef = useRef(null)
    
    // Redux states
    const notification =    useSelector((state: ReduxState) => 
    state.notification)
    const { login } =       useSelector((state: ReduxState) => state.login)
    const { theme } =       useSelector((state: ReduxState) => state.theme)
    const { calendarID } =  useSelector((state: ReduxState) => state.misc)
    const { search } =      useSelector((state: ReduxState) => state.event)
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification({navigation, theme,
        setPushNotification, setPushNotificationContent})

    // All categories to filter - DO NOT CHANGE IDS
    const category = [
        {id: 2, category: "TEKKOM"},
        {id: 3, category: "SOCIAL"},
        {id: 4, category: "CTF"},
        {id: 5, category: "KARRIEREDAG"},
        {id: 6, category: "FADDERUKA"},
        {id: 7, category: "BEDPRES"},
        {id: 8, category: "LOGIN"},
        {id: 9, category: "ANNET"}
    ]

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [FilterUI({textInputRef, setRenderedArray, setClickedCategory, relevantCategories, clickedCategory, search, setInput, items: events, theme})],
                left: [LogoNavigation(navigation, isDark)],
                right: [FilterButton({renderedArray, clickedCategory, input, isDark, dispatch, search}), DownloadButton(clickedEvents, setDownloadState, downloadState, calendarID, dispatch, isDark)]
            }
        } as Partial<BottomTabNavigationOptions>)
            
    },[navigation, search, renderedArray, clickedCategory, input, isDark, textInputRef, setRenderedArray, setClickedCategory, relevantCategories, clickedCategory, theme, search, setInput, events])

    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked events
            fetchState(setClickedEvents)
        }, [])
    )
    
    //  --- STORES EVENTS WHEN CLICKED EVENTS IS UPDATED ---
    useEffect(()=>{
        storeEvents({events, clickedEvents})
    },[clickedEvents])

    //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    useEffect(() => {
        // If the filter is not null or there are categories clicked
        if (input.length || clickedCategory.length > 0) {
            // If the filter is not null but no categories are clicked
            if (input.length && clickedCategory.length === 0)  {
                // If the length of the filter search text is equal 0
                if (input.length === 0) {
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                    // Resets renderedArray to all events
                    setRenderedArray([...events])
                }
                // Run filter function if the filter search text is not empty
                Filter({input, setRenderedArray, events, clickedEvents, 
                    clickedCategory})
            } else {
                // If the filter is not null and there are categories clicked
                if (input.length && clickedCategory.length > 0) {
                    // If the filter text is not empty calls filterBoth function
                    if (input.length > 0) {
                        filterBoth({clickedCategory, clickedEvents, 
                        events, setRenderedArray, input})
                    }
                    // When categories are clicked but there is no input text
                    else {filterCategories({events, clickedEvents, 
                        clickedCategory, setRenderedArray})}
                } else {filterCategories({events, clickedEvents, 
                    clickedCategory, setRenderedArray})}
            }
        // If the filter input is null only filter categories
        } else {
            // If the filter is not null but no categories are clicked
            if (input.length && clickedCategory.length === 0 ) {
                // If the filter length is 0
                if (input.length === 0) {
                    // Resets renderedArray
                    setRenderedArray([...events])
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                }
                // Resets if there is no text to filter
            } else setRenderedArray([...events])
        }

        // Listens to changes in these arrays
    }, [input, clickedCategory])

    // --- LOADING INITIAL DATA ---
    useEffect(() => {
        // Fetches API
        getData({setEvents, setRenderedArray, setLastSave, events})

        // Fetches clickedEvents
        fetchState(setClickedEvents)

        // Fetches categories available to filter
        fetchRelevantCategories({setRelevantCategories, clickedEvents, events, 
            category})
        events.length 
            ? setRenderedArray([...events]) 
            : fetchStored({setRenderedArray, setState: setEvents})
    // Renders when the screen is loaded
    }, [])

    //  --- UPDATES FILTER ON EVENT CHANGE ---
    useEffect(() => {
        // Updates relevant categories to filter
        fetchRelevantCategories({setRelevantCategories, clickedEvents, events, 
            category})
        // Listens for changes in these arrays
    }, [events.length, clickedEvents.length])

    // --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    useEffect(() => {
        let interval: Interval = 0

        // Only when filter is closed to prevent "no match" issue
        if (!search) {
            interval = setInterval(() => {
                // Storing the current time
                (async() => {
                    // Storing in AsyncStorage
                    await AsyncStorage.setItem("lastFetch", 
                    new Date().toISOString())
                    // Fetches cache
                    getData({setEvents, setRenderedArray, setLastSave, events})
                })()
                // Runs every 10 seconds
            }, 10000)
            // Clears the interval when the filter is opened
        } else clearInterval(interval)

        // Clears interval when unmounted to prevent memory leaks
        return () => clearInterval(interval)
    }, [search])

    // --- RESETS RENDERED EVENTS
    async function RenderEvents() {
        // Updates the rendered array
        setRenderedArray([...events])
        // Updates cache
        await AsyncStorage.setItem("cachedEvents", JSON.stringify(events))
    }

    // --- CHECKS FOR AND FIXES INCORRECT RENDER ---
    if (events.length > 0 && events.length !== renderedArray.length) {
        // Fixes any errors if the user is not currently filtering
        if (!input.length) clickedCategory.length === 0 ? RenderEvents():null
        // Fixes any potential render errors after user has been searching
        else if (input.length === 0 && clickedCategory.length === 0) {
            RenderEvents()
        }
    }

    // --- SETUP CODE ONCE APP IS DOWNLOADED---
    // Displays when the API was last fetched successfully
    if (lastSave === "") (async() => {setLastSave(await LastFetch())})()

    initializeNotifications({
        shouldRun: shouldSetupNotifications,
        setShouldSetupNotifications: setShouldSetupNotifications,
        hasBeenSet: notification["SETUP"]
    })

    // --- DISPLAYS THE EVENTSCREEN ---
    return (
        <EventStack.Navigator
        screenOptions={{
            animationEnabled: false,
            header: props => props.route.name !== "ProfileScreen" ? 
                <Header {...props} /> : null
            } as ExtendedStackRouteOptions}>
            <EventStack.Screen name="root">
                {({navigation}) => (
                    <View>
                    <StatusBar style={isDark ? "light" : "dark"} />
                    <View style={{
                        ...GS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                    }}>
                        {pushNotification && pushNotificationContent}
                        <EventList
                            navigation={navigation}
                            renderedArray={renderedArray}
                            clickedEvents={clickedEvents}
                            search={search}
                            relevantCategories={relevantCategories}
                            notification={notification}
                            setClickedEvents={setClickedEvents}
                            lastSave={lastSave}
                            events={events}
                            ErrorMessage={ErrorMessage}
                        />
                    </View>
                </View>
                )}
            </EventStack.Screen>
            <EventStack.Screen 
                name="SpecificEventScreen"
                component={SpecificEventScreen}
            />
        </EventStack.Navigator>
    )
}
