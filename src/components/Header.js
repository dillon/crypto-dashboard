import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    const { header } = styles
    return (
        <View>
            <Text style={header}>Cryptocurrency App</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',


    }
})

export default Header;