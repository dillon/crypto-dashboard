import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight, FlatList, Button, ScrollView, StyleSheet, Text, Image } from 'react-native';
import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';
import PropTypes from 'prop-types';
import CoinView from './CoinView';

class CryptoContainer extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this._handleBackPress = this._handleBackPress.bind(this);
        this._handleNextPress = this._handleNextPress.bind(this);

    }

    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute, symbol) {
        this.props.navigator.push(nextRoute);
    }

    componentDidMount() {
        this.props.FetchCoinData();
    }



    renderCoinCards() {
        const { crypto } = this.props;
        return crypto.data.map((coin, index) => {
            const nextRoute = {
                component: CoinView,
                title: coin.symbol,
                passProps: { coin: coin }
            };
            return (
                <TouchableHighlight underlayColor={'lightgrey'}
                    activeOpacity={0.5} key={coin.rank} onPress={() => this._handleNextPress(nextRoute, coin.symbol)}>
                    <CoinCard
                        key={coin.rank}
                        coin_name={coin.name}
                        price_usd={coin.price_usd}
                        percent_change_24h={coin.percent_change_24h}
                        percent_change_7d={coin.percent_change_7d}
                        _handleNextPress={this._handleNextPress}
                    />
                </TouchableHighlight>
            )

        }
        )
    }



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
                    justifyContent: 'center',
                    alignContent: 'center',
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderColor: "#ccc"

                }}>
                    <Text style={firstcolumn}>Name</Text>
                    <Text style={secondcolumn}>Price</Text>
                    <Text style={lastcolumns}>24hr</Text>
                    <Text style={lastcolumns}>7d</Text>
                </View>
                {this.renderCoinCards()}
            </ScrollView>
        )
    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 70,
        marginLeft: "5%",
        marginRight: "5%",
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
        width: "40%",
    },
    secondcolumn: {
        width: "25%",
    },
    lastcolumns: {
        width: "17.5%",
        textAlign: "right",
        paddingRight: 7
    },

}

function mapStateToProps(state) {
    return {
        crypto: state.crypto,
    }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)