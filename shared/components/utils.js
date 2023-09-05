import FetchColor from 'login/styles/fetchTheme';
import { ES } from 'login/styles/eventStyles';
import Svg, {Rect} from 'react-native-svg';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { T } from "login/styles/text"

/**
 * Function for creating an empty view, for adding spaces between objects such as views paragraphs etc
 * 
 * @param {float} height    How big the space should be
 * @returns             Empty view of the given height
 */
export default function Space (height) {
    return(
        <View style={{height: height}}/>
    );
}

/**
 * Function for drawing a dynamic line, can be adjusted as you wish using the height and width
 * 
 * @param {number} height   Height of the line
 * @param {number} width    Width of the line
 * @returns                 View of the given size based on theme
 */
export function Line (height, width, fill) {

    const { theme } = useSelector( (state) => state.theme )

    const line = (
        <View>
            <Svg 
                width={width} 
                height={height} 
                fill={fill ? fill : FetchColor(theme, 'ORANGE')}>
                <Rect x='1' y='1' width={width} height={height}/>
            </Svg>
        </View>
    )
    
    return line
}

/**
 * Returns a random number between min and max
 * 
 * @param {number} min Lowest acceptable integer
 * @param {number} max Highest acceptable integer
 * @returns 
 */
export function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/**
 * Displays an error message to the user
 * 
 * @param {string} argument  Error text to display
 * @param {number} theme     Users theme
 * @param {number} lang      Users language
 * 
 * @returns {JSX.Element} Error message
 */
export function errorMessage(argument, theme, lang) {

    const text = {
        "wifi": lang ? "Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer." : "Check your wifi connection and try again. Contact TEKKOM if the issue persists.",
        "nomatch": lang ? "Ingen treff" : "No matching events"
    }

    const styledError = (
        <View style={{alignSelf: 'center', maxWidth: '80%'}}>
              <View style={{height : '58%'}}/>
              <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>{text[argument]}</Text>
        </View>
    )
    
    return styledError
}

/**
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color for the text based on theme
 * @returns 
 */
export function Month(month, color, lang) {
    const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
    const monthsNO = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

    return <Text style={{...ES.monthText, color: color}}>{lang ? monthsNO[month - 1]: monthsEN[month - 1]}</Text>;
}