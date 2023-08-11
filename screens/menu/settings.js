{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import DynamicCircle from '../../shared/eventComponents/dynamicCircle';
import Notification from '../../shared/functions/notification';
import ThemeSwitch from '../../shared/functions/themeSwitch';
import Language from '../../shared/functions/language';
import Space from '../../shared/functions/space';
import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import Card from '../../shared/functions/card';
import { MS } from '../../styles/menuStyles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text';
import { BlurView } from 'expo-blur';
import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Cluster from '../../shared/functions/cluster';
import Reminders from '../../shared/functions/reminders';

{/* ========================= APP START ========================= */}

export default function SettingScreen( { navigation }) {

  const { theme } = useSelector( (state) => state.theme ) 
  const { lang  } = useSelector( (state) => state.lang  )

  const eventPage   = () => { navigation.navigate('EventScreen') }
  const menuPage   = () => { navigation.navigate('MenuScreen') }
  const adPage = () => { navigation.navigate('AdScreen') }

  const [info] = useState([
    {
        id: 0, 
        titleNO: 'Tema', 
        titleEN: 'Theme', 
        descriptionNO: 'Endrer appens fargetema.', 
        descriptionEN: 'Changes the color theme of the app.'
    },
    {
        id: 1, 
        titleNO: 'Språk', 
        titleEN: 'Language', 
        descriptionNO: 'Endrer språk.', 
        descriptionEN: 'Changes language.'
    },
    {
        id: 2, 
        titleNO: 'Varslinger', 
        titleEN: 'Notifications', 
    },
    {
        id: 3, 
        titleNO: 'Viktig informasjon', 
        titleEN: 'Important info', 
        descriptionNO: 'Motta varsel om viktig informasjon, som tid for årsmøte etc.', 
        descriptionEN: 'Recieve notifications about important information, such as annual meetings.'
    },
    {
        id: 4, 
        titleNO: 'Nye arrangementer', 
        titleEN: 'New events', 
    },
    {
        id: 5, 
        titleNO: 'Bedpres', 
        titleEN: 'Company Presentations', 
        descriptionNO: 'Varsel hver gang det legges ut ny bedriftpresentasjon.', 
        descriptionEN: 'Notification every time a company presentation is posted.'
    },
    {
        id: 6, 
        titleNO: 'TekKom', 
        descriptionNO: 'Varsel hver gang det legges ut en TekKom samling.', 
        descriptionEN: 'Notification every time a TekKom gathering is posted.'},
    {
        id: 7, 
        titleNO: 'CTF', 
        descriptionNO: 'Varsel hver gang det legges ut en CTF.', 
        descriptionEN: 'Notification every time a CTF is posted.'
    },
    {
        id: 8, 
        titleNO: 'Sosialt', 
        titleEN: 'Social', 
        descriptionNO: 'Varsel hver gang det legges ut et EvntKom arrangement.', 
        descriptionEN: 'Notification every time a EvntKom event is posted.'
    },
    {
        id: 9, 
        titleNO: 'Karrieredag', 
        titleEN: 'Career day', 
        descriptionNO: 'Varsel hver gang det legges ut en karrieredag.', 
        descriptionEN: 'Notification every time a career day is posted.'
    },
    {
        id: 10, 
        titleNO: 'Fadderuka', 
        descriptionNO: 'Varsel hver gang det legges ut et fadderuka arrangement.', 
        descriptionEN: 'Notification every time a fadderuka event is posted.'
    },
    {
        id: 11, 
        titleNO: 'Login', 
        descriptionNO: 'Varsel hver gang det legges ut et arrangement angående foreningens drift.', 
        descriptionEN: 'Notification every time a event is posted regarding the operation of Login.'
    },
    {
        id: 12, 
        titleNO: 'Annet', 
        titleEN: 'Other', 
        descriptionNO: 'Varsel hver gang det legges ut et ukategorisert arrangement.', 
        descriptionEN: 'Notification every time an uncategorized event is posted.'
    },
    {
        id: 13, 
        titleNO: 'Påminnelser', 
        titleEN: 'Reminders',
    },
  ])

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/8.1)}
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[0].titleNO : info[0].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[0].descriptionNO : info[0].descriptionEN }</Text>
              </View>
              <View style={GS.view2}><ThemeSwitch/></View>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[1].titleNO : info[1].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[1].descriptionNO : info[1].descriptionEN }</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Cluster>

          {Space(10)}
          <Text style={{...T.text30, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[2].titleNO : info[2].titleEN}</Text>              
          {Space(10)}

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[3].titleNO : info[3].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[3].descriptionNO : info[3].descriptionEN }</Text>
              </View>
              <View style={GS.view2}><Notification category='IMPORTANT'/></View>
            </View>
          </Cluster>

          {Space(10)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[4].titleNO : info[4].titleEN}</Text>              
          {Space(10)}
          
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[5].titleNO : info[5].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[5].descriptionNO : info[5].descriptionEN }</Text>
              </View>
              <Notification category='BEDPRES'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{info[6].titleNO}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[6].descriptionNO : info[6].descriptionEN }</Text>
             </View>
              <Notification category='TEKKOM'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{info[7].titleNO}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[7].descriptionNO : info[7].descriptionEN }</Text>
              </View>
              <Notification category='CTF'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[8].titleNO : info[8].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[8].descriptionNO : info[8].descriptionEN }</Text>
              </View>
              <Notification category='SOCIAL'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[9].titleNO : info[9].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[9].descriptionNO : info[9].descriptionEN }</Text>
              </View>
              <Notification category='KARRIEREDAG'/>
            </View>
          </Cluster>
          
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{info[10].titleNO}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[10].descriptionNO : info[10].descriptionEN }</Text>
              </View>
              <Notification category='FADDERUKA'/>
            </View>
          </Cluster>


          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{info[11].titleNO}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[11].descriptionNO : info[11].descriptionEN }</Text>
              </View>
              <Notification category='LOGIN'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? info[12].titleNO : info[12].titleEN }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[12].descriptionNO : info[12].descriptionEN }</Text>
              </View>
              <Notification category='ANNET'/>
            </View>
            {Space(5)}
          </Cluster>

          {Space(10)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? info[13].titleNO : info[13].titleEN}</Text>              
          {Space(10)}
          <Reminders/>
          {Space(8)}
          {Space((Dimensions.get('window').height/3))}
        </ScrollView>
      </View>   

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innstillinger' : 'Settings'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
            <Image 
                style={MS.bMenuIcon} 
                source={theme == 0 || theme == 2 || theme == 3 ? 
                    require('../../assets/menu/calendar777.png') 
                : 
                    require('../../assets/menu/calendar-black.png')
                } 
            />
        </TouchableOpacity>
        <TouchableOpacity 
            style={MS.bMenuIconTO} 
            onPress={() => adPage()}>
        <Image 
            style={MS.bMenuIcon} 
            source={theme == 0 || theme == 2 || theme == 3 ? 
                require('../../assets/menu/business.png') 
            : 
                require('../../assets/menu/business-black.png')
            } 
        />
        </TouchableOpacity>
        <TouchableOpacity 
            style={MS.bMenuIconTO} 
            onPress={() => menuPage()
        }>
          <Image 
            style={MS.bMenuIcon} 
            source={
                require('../../assets/menu/menu-orange.png')
            } 
        />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};