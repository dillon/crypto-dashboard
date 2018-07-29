import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import axios from 'axios';
// import { connect } from 'react-redux';
// import FetchCoinNews from './../Actions/FetchCoinNews';
export default class Article extends React.Component {
    render() {
        const { row } = styles
        return (
            <View style={row}>
                <Text>{this.props.title}</Text>
                <Text> - {this.props.source}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({

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
