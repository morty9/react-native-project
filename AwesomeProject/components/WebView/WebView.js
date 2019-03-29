import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';

export default class MyWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uri: ''
        }
    }

    render() {
        const myurl = this.props.navigation.getParam('uri', 'Pas d\'url');

        return (
            <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ uri: myurl }}
                onNavigationStateChange={(event) => {
                    if (event.url !== myurl) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
            />
        );
    }
}