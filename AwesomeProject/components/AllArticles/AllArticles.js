import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment";

export default class AllArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    getAllArticles = () => {
        var url;
        if (this.props.sorted == "bySection") {
            url = `https://api.nytimes.com/svc/topstories/v2/${this.props.section}.json?api-key=4YVsAPfNnLSIxe3DTzSw7DdrpaIkA7DW`
        } else if (this.props.sorted == "all") {
            url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=4YVsAPfNnLSIxe3DTzSw7DdrpaIkA7DW`;
        } else if (this.props.sorted == "byViews") {
            url = "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=4YVsAPfNnLSIxe3DTzSw7DdrpaIkA7DW";
        }
        
        fetch(url)
            .then((value) => value.json())
            .then((body) => {
                this.setState({ articles: body.results })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    onPressItem = (item) => {
        var url_icon;
        if (item.multimedia) {
            url_icon = item.multimedia[3] ? item.multimedia[3].url : item.thumbnail_standard;
        } else if (item.media) {
            url_icon = item.media[0]['media-metadata'][2].url;
        } else {
            url_icon = item.thumbnail_standard;
        }
        this.props.navigation.navigate('Details', {
            article: item,
            image: url_icon
        });
    }

    updateSearch = (newSearch) => {
        this.setState({search: newSearch})
    }

    renderItem = (item) => {
        const article = item.item;
        var url_icon;

        if (article.multimedia) {
            url_icon = article.multimedia[0] ? article.multimedia[0].url : article.thumbnail_standard;
        } else if (article.media) {
            url_icon = article.media[0]['media-metadata'][0].url;
        } else {
            url_icon = article.thumbnail_standard;
        }

        return (
            <ListItem
                key={article.slug_name}
                leftAvatar={{ source: { uri: url_icon } }}
                title={article.title}
                subtitle={moment(article.first_published_date).format("DD-MM-YYYY")}
                chevron
                onPress={() => this.onPressItem(article)}
            />
        )
    }

    listEmpty = () => {
        return (
            <View style={{marginTop: "20%"}}>
                <ActivityIndicator size='large' color='#264775'/>
            </View>
        );
    };

    componentDidMount() {
        this.getAllArticles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sorted !== this.props.sorted) {
            this.getAllArticles(); 
        }
    }

    render() {
        
        return (
            <ScrollView>
                <FlatList
                    data={this.state.articles}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.listEmpty}
                />
            </ScrollView>
        )
    }
}