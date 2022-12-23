import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import React, { useState } from 'react';
import Card, { Space, AllComitees, Line } from '../../shared/sharedComponents';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function CommitteeMenuScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const eventPage   = () => { navigation.navigate('EventScreen')       }
  const homePage    = () => { navigation.navigate('HomeScreen')        }
  const listingPage = () => { navigation.navigate('ListingScreen')     }
  const profilePage = () => { navigation.navigate('ProfileScreen')     }
  const goBack      = () => { navigation.navigate('ContactMenuScreen') }

  return(
    <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Komité' : 'Committee'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
    <ScrollView>
      <View>
        <Card>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:kontakt@login.no')}>
              <View>
              <View style={GS.row}>
              <Text>{Line(60,5)}</Text>
              <View>
              <Text style={{...T.boldWithLine, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Trykk på flyet for henvendelser angående app, nettside, eller som ikke skal til en konkret komite.' : 'Press the plane for inquiries regarding app, website, or not for a specific committee'}</Text>
              </View>
            </View>
            {Space(10)}
                <Image style={GS.image200} source={require('../../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
          <AllComitees/>
        </Card>
        {Space(10)}
      </View>
    </ScrollView>
  </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};