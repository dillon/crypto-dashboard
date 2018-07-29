import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Image
} from 'react-native';
import FetchCoinNews from './../Actions/FetchCoinNews';
import PropTypes from 'prop-types';
import Article from './Article';

const numberWithCommas = (x) => {
    if (x) {
        return "$" + x.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',');
    }
    else {
        return "N/A"
    }
}


class CoinView extends Component {

    componentDidMount() {
        this.props.FetchCoinNews();
    }

    renderNewsArticles() {
        const { news } = this.props;
        return news.data.map((article, index) => {
            return (
                <TouchableHighlight underlayColor={'lightgrey'}
                    activeOpacity={0.5} key={coin.rank} onPress={() => this._handleNextPress(nextRoute, coin.symbol)}>
                    <Article
                        title={article.title}
                        source={article.source.title}
                    />
                </TouchableHighlight>
            )

        }
        )
    }



    render() {
        console.log(this.state)
        coin = this.props.coin
        news = this.props.news
        const { container, imageContainer, image } = styles
        if (news.isFetching) {
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
            <ScrollView>
                <View style={container}>
                    <Text>Market Cap: {numberWithCommas(coin.market_cap_usd)}</Text>
                    <Text>24h Volume: {numberWithCommas(coin["24h_volume_usd"])}</Text>
                    <Text>Available Supply: {numberWithCommas(coin.available_supply)}</Text>
                    <Text>Total Supply: {numberWithCommas(coin.total_supply)}</Text>
                    <Text>Max Supply: {numberWithCommas(coin.max_supply)}</Text>
                    {this.renderNewsArticles()}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
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

})



function mapStateToProps(state) {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, { FetchCoinNews })(CoinView)