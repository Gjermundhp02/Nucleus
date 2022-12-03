import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ES } from '../../styles/eventStyles'
const GLOBAL = require('../../styles/themes/dark')
import { T } from '../../styles/text';
import { CheckBox, CheckedBox } from '../sharedComponents';

export default function Filter(data, title, categories) {

    const [clickedCategory, setClickedCategory] = useState([])
    const [category] = useState([
        {id: '1', category: 'TEKKOM'}, 
        {id: '2', category: 'SOCIAL'},
        {id: '3', category: 'CTF'},
        {id: '4', category: 'KARRIEREDAG'}, 
        {id: '5', category: 'FADDERUKA'},
        {id: '6', category: 'BEDPRES'},
        {id: '7', category: 'LOGIN'}
    ])

    const [filter, setFilter] = useState({
        input: '',
        check_textInputChange: false
      }) 

    const filterInput = (val) => {
    if(val.length > 0) {
        setFilter({
        ...filter,
        input: val,
        check_textInputChange: true
        })
    }else{
        setFilter({
        ...filter,
        input: val,
        check_textInputChange: false
        })
    }}

    return(
        <View>
            <TextInput
                style={ES.filterText}
                placeholder='Søk..'
                placeholderTextColor={GLOBAL.DARK.TITLETEXTCOLOR}
                textAlign='center'
                onChangeText={(val) => filterInput(val)}
            />
            <View style={ES.filterView}>
                <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        data={category}
                        renderItem={({item}) => (
                            <View style={ES.categoryView}>
                                {clickedCategory.includes(item) ?
                                    <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                                        <Text style={T.filterCategoryText}>{item.category}</Text>
                                        <CheckedBox/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                        <Text style={T.filterCategoryText}>{item.category}</Text>
                                        <CheckBox/>
                                    </TouchableOpacity>
                                }
                                
                                
                            </View>
                        )}
                /><Text/>
            </View>
        </View>
        
    )
}