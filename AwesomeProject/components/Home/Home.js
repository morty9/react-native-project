import React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import AllArticles from "../../components/AllArticles/AllArticles";
import SortArticles from "../../components/SortArticles/SortArticles";

export default class Home extends React.Component {

    static navigationOptions = {
        title: 'New York Times',
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            search: '',
            selectedIndex: 0
        }
    }

    updateIndex = (selectedIndex) => {
        this.setState({ selectedIndex: selectedIndex });
    }

    scalableComponent = () => {
        switch (this.state.selectedIndex) {
            case 0:
                return (<SortArticles navigation={this.props.navigation} />);
            case 1:
                return (<AllArticles sorted="all" navigation={this.props.navigation} />);
            case 2:
                return (<AllArticles sorted="byViews" navigation={this.props.navigation} />);
            default:
                return (<SortArticles navigation={this.props.navigation} />);
        }
    }

    render() {
        const buttonsGroup = ['Par thème', 'Tous', '+ populaire'];

        return (
            <View style={{ height: "100%" }}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttonsGroup}
                    containerStyle={{ height: 40 }}
                />
                {this.scalableComponent()}
            </View>
        )
    }
}