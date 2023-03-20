import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import Svg, { Rect } from 'react-native-svg';
import { View } from 'react-native';
import React from 'react';

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: 'CATEGORY'
 * @returns                 Small circle of the categories color
 */
export default function CornerSquare(theme, corner, type) {  //SVG showing the color of the category
    let p1 = 10, p2 = 100, p3 = 13, p4 = 102, p5 = 0, p6 = 160, p7 = 70, p8 = 345;
    
    if(type) {
        if(corner == 1) p1 = -83.5, p2 = 133.75, p3 = -70.2, p4 = 271, p5 = -83.5, p6 = 329, p7 = -13.5, p8 = 513.8
        if(corner == 3) p1 = -39.5, p2 = 133.75, p3 = -26.2, p4 = 271, p5 = -40, p6 = 329, p7 = 30.5, p8 = 520
        if(corner == 0 || corner == 2) {
            p1 = 0, p2 = 0, p3 = 13, p4 = 137, p5 = 0, p6 = 195, p7 = 70, p8 = 380
        }
    }

    return(
        <View style={type ? {...GS.aboutImage,top: corner == 1 || corner == 3 ? 100:null, maxWidth: corner == 1 || corner == 3 ? 100:null, transform: [{ rotate: `${90*corner}deg` }]}:{...GS.personImage, transform: [{ rotate: `${90*corner}deg` }]}}>
            <View style={{maxHeight: 220}}>
                {/** ORANGE */}
                <Svg left={type ? p1:null} bottom={type ? p2:null} width={type ? 150:115} height={type?150:115} fill={FetchColor(theme, "ORANGE")}>
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND INSIDE*/}
                <Svg left={p3} bottom={p4} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND FIRST CLOCKWISE */}
                <Svg left={p5} bottom={p6} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={20} height={13} />
                </Svg>

                {/** BACKGROUND LAST CLOCKWISE*/}
                <Svg left={p7} bottom={p8} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={13} height={20} />
                </Svg>
            </View>
        </View>
    );
};
