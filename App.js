/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import Message from "./chatComponents/Message";
import Avatar from "./chatComponents/Avatar";
import avatarImage from './Images/avatar.png'
import suggesstionImage from './Images/sugesstion.png'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const suggestionsTemp = ['Companies', 'Portfolio', 'Careers', 'Themes', 'Careers']
const chatData = [
    {
        text: 'Let’s get started on our learning journey.',
        suggestions: ['Learning', 'Careers', 'Themes']
    },
    {
        text: 'This is the new text message',
        suggestions: ['Companies']
    },
    {
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        suggestions: ['Companies', 'Portfolio', 'Learning', 'Careers', 'Themes']
    },
    {
        text: 'you can select any of this',
        suggestions: ['Companies', 'Portfolio', 'Careers', 'Themes']
    },
    {
        text: 'It has survived not only five centuries',
        suggestions: ['Companies', 'Careers', 'Themes']
    },
    {
        text: 'Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        suggestions: ['Careers', 'Themes']
    },
    {
        text: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose.',
        suggestions: ['Companies', 'Portfolio', 'Learning', 'Careers', 'Themes']
    },
]
type Props = {};
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
export default class App extends Component<Props> {
    state = {
        messages: [],
    }

    componentWillMount() {
        this.chatList = null
        let message = chatData[0]
        this.setState({
            messages: [{
                _id: Math.round(Math.random() * 1000000),
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: avatarImage,
                },
                ...message
            }],
        })
    }

    onSuggestion() {
        let message = chatData[getRandomInt(7)]
        debugger
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: avatarImage,
                    },
                    ...message
                }),
            };
        }, () => {
            debugger
            this.chatList && this.chatList.scrollToEnd()
        });
    }

    renderSuggestion (item, index, odd) {
        let margins = odd ?
            {marginLeft: (index % 2 !== 0 && index) ? 15 : 5, marginRight: (index % 2 === 0) ? 15 : 5} :
            {marginLeft: (index % 2 === 0) ? 15 : 5, marginRight: (index % 2 !== 0) ? 15 : 5}

            let style = (index === 0 && odd) && {margin: 5} || margins
        return (
            <TouchableHighlight style={{flex: 1}} onPress={() => this.onSuggestion()} underlayColor={'transparent'}>
                <View style={{flex: 1, margin: 5, backgroundColor: '#1C3C70', borderRadius: 5, flexDirection: 'row', alignItems: 'center', ...style}}>
                    <Image style={{height: 35, width: 35, marginHorizontal: 18}} source={suggesstionImage}/>
                    <Text style={{color: '#FFF'}}>{item}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let suggestions = this.state.messages[this.state.messages.length-1].suggestions
        let isTopComponent = suggestions.length > 0 && suggestions.length % 2 !== 0
        return (
            <View style={{ backgroundColor: "#69B8D0", flex: 1 }}>
                <View style={{marginBottom: 15, marginTop: 50}}>
                    <View style={{marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '30%', paddingRight: '10%'}}>
                        <Text style={{color: '#FFF', opacity: 0.68, fontWeight: 'bold', alignSelf: 'center'}}>Harriette</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{height: 30, width: 30, marginRight: 24}} source={avatarImage}/>
                            <Image style={{height: 28, width: 28}} source={avatarImage}/>
                        </View>
                    </View>
                    <Image style={{height: 72, width: 72, alignSelf: 'center'}} source={avatarImage}/>
                    <Text style={{color: '#FFF', fontWeight: 'bold', alignSelf: 'center'}}>Fenway</Text>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    user={{
                        _id: 1,
                    }}
                    renderDay={() => <View />}
                    renderTime={() => <View />}
                    renderInputToolbar={() => <View />}
                    renderChatFooter={() => <View />}
                    renderMessage={(messageProps) => <Message {...messageProps} />}
                    customTextStyle={{color: '#000', fontSize:   16}}
                    listViewProps={ref => this.chatList = ref}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10}}>
                    {
                        suggestions.map((item, index) => {
                            return (
                                <View style={{width: (isTopComponent && index === 0) ? '51%' : '50%', height: 60}}>
                                    {this.renderSuggestion(item, index, isTopComponent)}
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
