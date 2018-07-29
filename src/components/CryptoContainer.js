import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight, FlatList, Button, ScrollView, StyleSheet, Text, Image } from 'react-native';
import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';
import PropTypes from 'prop-types';

class CryptoContainer extends Component {
    static propTypes = {
        route: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }),
        navigator: PropTypes.object.isrequired,
    };

    constructor(props, context) {
        super(props, context);
        this._onBackward = this._onBackward.bind(this);
    }

    _onBackward() {
        let nextIndex = ++this.props.index;
        this.props.navigator.push({
            component: CryptoContainer,
            title: 'Scene ' + nextIndex,
            passProps: { index: nextIndex },
        });
    }

    componentDidMount() {
        this.props.FetchCoinData();
    }



    _renderItem({ coin }) {
        coin.map(item => {
            return <CoinCard
            id={coin.id}
            coin_name={coin.name}
            price_usd={coin.price_usd}
            percent_change_24h={coin.percent_change_24h}
            percent_change_7d={coin.percent_change_7d}
        // onPressItem={this._onPressItem}
        />
        
        })
    };



    render() {
        const { crypto } = this.props;
        const { contentContainer, image, imageContainer, firstcolumn, secondcolumn, lastcolumns } = styles;
        if (crypto.isFetching) {
            return (
                <View style={imageContainer}>
                    <Image
                        style={image}
                        source={require('../Utils/icon.png')}
                    />
                </View>
            )
        }

        return (
            <ScrollView contentContainerStyle={contentContainer}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 5,
                    marginRight: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottomWidth: 1,

                }}>
                    <Text style={firstcolumn}>Name</Text>
                    <Text style={secondcolumn}>Price</Text>
                    <Text style={lastcolumns}>24hr</Text>
                    <Text style={lastcolumns}>7d</Text>
                </View>
                <FlatList
                    data={crypto}
                    keyExtractor={item => item.id}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        )
    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 70,
        marginLeft: 20,
        display: "flex",
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: 40,
        height: 40,
    },
    firstcolumn: {
        fontSize: 14,
        width: "40%",
    },
    secondcolumn: {
        fontSize: 14,
        width: "25%"
    },
    lastcolumns: {
        fontSize: 14,
        width: "17.5%",
        alignSelf: 'flex-end'
    },

}

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)