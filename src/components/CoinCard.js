import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

const CoinCard = ({ coin_name, price_usd, percent_change_24h, percent_change_7d }) => {
    const { container, image, bold, row, lastcolumns, secondcolumn, firstcolumn, } = styles
    const conditionalcolor24h = percent_change_24h >= 0 ? "green" : "red";
    const isPositive7d = percent_change_7d >= 0;
    const isPositive24h = percent_change_24h >= 0;
    const conditionalcolor7d = isPositive7d ? "green" : "red";
    const operator24h = isPositive24h ? "+" : "";
    const operator7d = isPositive7d ? "+" : "";
    return (
            <View style={row} onPress={this._onForward}>
                <Text style={firstcolumn}>{coin_name}</Text>
                <Text style={secondcolumn}>${Math.round(price_usd * 100000) / 100000}</Text>
                <Text style={lastcolumns}><Text style={{ color: conditionalcolor24h }}>{operator24h}{percent_change_24h}%</Text></Text>
                <Text style={lastcolumns}><Text style={{ color: conditionalcolor7d }}>{operator7d}{percent_change_7d}%</Text></Text>
            </View>
    )
}



const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
    },
    firstcolumn: {
        fontSize: 16,
        width: "40%",
    },
    secondcolumn: {
        width: "25%"
    },
    lastcolumns: {
        fontSize: 12,
        width: "17.5%",
        alignSelf: 'flex-end'
    },
    row: {
        justifyContent: 'center',
        alignContent: 'center',
        display: "flex",
        flexDirection: "row",
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    }
})
export default CoinCard;