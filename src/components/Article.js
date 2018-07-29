import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
export default class Article extends React.Component {
    render() {
        const { container, mutedText, row } = styles
        return (
            <View style={row}>
                <Text>{this.props.title}</Text>
                <Text style={mutedText}>{this.props.source}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },

    mutedText: {
        paddingTop: 2,
        paddingBottom: 2,
        color: "grey",
        fontSize: 12
    }
})
