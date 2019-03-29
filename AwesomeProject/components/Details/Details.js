import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Badge } from 'react-native-elements';
import moment from "moment";

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {},
            image: ''
        }
    }

    componentDidMount() {
        this.setState({
            currentArticle: this.props.navigation.getParam('article', 'Pas d\'article'),
            image: this.props.navigation.getParam('image', 'Pas d\'image')
        });
    }

    onPress = () => {
        this.props.navigation.push("MyWebView", {
            uri: this.state.currentArticle.url
        });
    }

    render() {
        return (
            <Card
                title={this.state.currentArticle.title}
                image={{ uri: this.state.image }}>
                <Text style={{ marginBottom: 10 }}>
                    {this.state.currentArticle.abstract}
                </Text>
                <Text style={{ fontStyle: 'italic', textAlign: 'left' }}>
                    {moment(this.state.currentArticle.first_published_date).format("DD-MM-YYYY")}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>{this.state.currentArticle.byline}</Text>
                    <Badge value={this.state.currentArticle.section}></Badge>
                </View>
                <Button style={{ marginTop: "5%" }} title="View source article" onPress={this.onPress} />
            </Card>
        )
    }
}