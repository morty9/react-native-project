import React from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import allThemes from './articles_sections.json';
import AllArticles from "../../components/AllArticles/AllArticles";
import Icon from 'react-native-vector-icons/FontAwesome';

const sectionsList = allThemes;
const numColumns = 2;

export default class SortArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sectionsVisibility: 0,
            sectionItem: "",
            sectionIcon: ""
        }
    }

    _handleStateChange = ({ nativeEvent }, item) => {
        if (nativeEvent.state === State.END) {
            this.setState({
                sectionsVisibility: 1,
                sectionItem: item.section,
                sectionIcon: item.icon
            });
        }
    }

    renderItemTheme = ({ item }) => {
        return (
            <TapGestureHandler key={item.title} onHandlerStateChange={(nativeEvent) => this._handleStateChange(nativeEvent, item)} numberOfTaps={1}>
                <View key={item.title} style={styles.item}>
                    <Icon name={item.icon} size={80} color={item.color} type='font-awesome'></Icon>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
            </TapGestureHandler>
        )
    }

    listEmpty = () => {
        return (
            <View style={{ marginTop: "20%" }}>
                <ActivityIndicator size='large' color='#264775' />
            </View>
        );
    };

    flatListComponent = () => {
        return (
            <FlatList
                horizontal={false}
                data={sectionsList}
                style={styles.container}
                renderItem={this.renderItemTheme}
                numColumns={numColumns}
                ListEmptyComponent={this.listEmpty}
            />
        )
    }

    allArticlesComponent = () => {
        return (
            <View>
                <Icon style={{ marginLeft: "2%", marginTop: "2%" }} onPress={this.backToSectionsList} name="arrow-left" size={30} color="#D34141" type='font-awesome'></Icon>
                <AllArticles sorted="bySection" section={this.state.sectionItem} icon_section={this.state.sectionIcon} navigation={this.props.navigation} />
            </View>

        )
    }

    backToSectionsList = () => {
        this.setState({ sectionsVisibility: 0 });
    }

    scalableComponent = () => {
        switch (this.state.sectionsVisibility) {
            case 0:
                return this.flatListComponent();
            case 1:
                return this.allArticlesComponent();
            default:
                return this.flatListComponent();
        }
    }

    render() {
        return (
            <View style={{ height: "100%" }}>
                {this.scalableComponent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#F6F8FA',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#424242',
    },
});