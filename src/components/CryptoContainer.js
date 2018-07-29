import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight, FlatList, Button, ScrollView, StyleSheet, Text, Image } from 'react-native';
import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';
import PropTypes from 'prop-types';

class CryptoContainer extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
    }

    _onForward() {
        this.props.navigator.push({
            title: 'Scene ' + nextIndex,
        });

    }

    componentDidMount() {
        this.props.FetchCoinData();
    }



    renderCoinCards() {
        const { crypto } = this.props;
        console.log(crypto)
        return crypto.data.map((coin, index) =>
            <CoinCard
                key={index}
                coin_name={coin.name}
                price_usd={coin.price_usd}
                percent_change_24h={coin.percent_change_24h}
                percent_change_7d={coin.percent_change_7d}
                _onForward={this._onForward}
            />
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
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 5,
                    marginRight: 5,
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