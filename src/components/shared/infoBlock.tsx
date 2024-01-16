import { Image, Text, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { useSelector } from "react-redux"
import infoSvg from "@assets/icons/info.svg"

type InfoBlockProps = {
    infoText: string
}

export default function InfoBlock({infoText}: InfoBlockProps){
    const { theme } = useSelector((state: ReduxState) => state.theme)
    
    return (
        <View style={{
            backgroundColor: '#003946',
            minHeight: 50,
            width: '100%',
            borderRadius: 5,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <SvgXml xml={infoSvg}></SvgXml>
            </View>
            <Text style={{color: "#dcf9ff", fontSize: 20, paddingVertical: 10, width: '80%'}}>
                {infoText}
            </Text>
        </View>
    )
}