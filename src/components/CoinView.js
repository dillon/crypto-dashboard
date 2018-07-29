import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';
import FetchCoinNews from './../Actions/FetchCoinNews';
import PropTypes from 'prop-types';
import Article from './Article';

const numberWithCommas = (x) => {
    if (x) {
        return x.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',');
    }
    else {
        return "N/A"
    }
}


class CoinView extends Component {

    componentDidMount() {
        this.props.FetchCoinNews(this.props.coin.symbol);
    }

    renderNewsArticles() {
        const { news } = this.props;
        return news.data.map((article, index) => {
            return (
                <TouchableHighlight underlayColor={'lightgrey'}
                    activeOpacity={0.5} key={article.published_at + article.slug}>
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
        coin = this.props.coin
        news = this.props.news

        const isPositive7d = coin.percent_change_7d >= 0;
        const isPositive24h = coin.percent_change_24h >= 0;
        const operator24h = isPositive24h ? "+" : "";
        const operator7d = isPositive7d ? "+" : "";
        

        const { firstcontainer, header, container, imageContainer, image } = styles
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
                <View style={firstcontainer}>
                    <Text style={header}>
                        {coin.name}
                    </Text>
                    <Text>Current Price: ${numberWithCommas(Math.round(coin.price_usd * 100000) / 100000)}</Text>
                    <Text>Change 24h: {operator24h}{numberWithCommas(coin.percent_change_24h)}%</Text>
                    <Text>Change 7d: {operator7d}{numberWithCommas(coin.percent_change_7d)}%</Text>
                    <Text>Market Cap: ${numberWithCommas(coin.market_cap_usd)}</Text>
                    <Text>24h Volume: ${numberWithCommas(coin["24h_volume_usd"])}</Text>
                    <Text>Available Supply: {numberWithCommas(coin.available_supply)}</Text>
                    <Text>Total Supply: {numberWithCommas(coin.total_supply)}</Text>
                    <Text>Max Supply: {numberWithCommas(coin.max_supply)}</Text>
                </View>
                <View style={container}>
                    <Text style={header}>
                        Related News
                    </Text>
                    {this.renderNewsArticles()}
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    firstcontainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 80
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    row: {
        justifyContent: 'center',
        alignContent: 'center',
        display: "flex",
        flexDirection: "row",
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