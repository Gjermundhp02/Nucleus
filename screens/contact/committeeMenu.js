import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import { useState } from 'react';
import Card from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Flatlist
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function CommitteeMenuScreen({ navigation }) {
    const [setting] = useState([
        {id: '1', nav: 'ContactStyretScreen', title: 'Styret'},
        {id: '2', nav: 'ContactEventKomScreen', title: 'EventKom'},
        {id: '3', nav: 'ContactTekKomScreen', title: 'TekKom'},
        {id: '4', nav: 'ContactPRScreen', title: 'PR'},
        {id: '5', nav: 'ContactCTFkomScreen', title: 'CTFkom'},
        {id: '6', nav: 'ContactSATkomScreen', title: 'SATkom'},
      ])

      const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const listingPage = () => {
  navigation.navigate('ListingScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}
const goBack = () => {
    navigation.goBack()
}

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}> Velg Komité</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>

          <Flatlist
          showsVerticalScrollIndicator={''}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
              <Text style={T.centered20}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
              <View>
                <Image style={GS.smallImage} source={require('../../assets/login-text.png')} />
              </View>
            </TouchableOpacity>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenu}>
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