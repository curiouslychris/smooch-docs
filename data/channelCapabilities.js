export const SUPPORT_LEVEL = {
    FULL: 'full',
    PARTIAL: 'partial',
    NONE: 'none',
    NA: 'na'
};

export const CAPABILITIES = {
    text: {
        name: 'Text',
        link: '/guide/sending-messages/#sending-text-messages-with-the-api',
        send: true,
        receive: true
    },
    image: {
        name: 'Image',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: true
    },
    file: {
        name: 'File',
        link: 'https://docs.smooch.io/rest/#file-message',
        send: true,
        receive: true
    },
    gif: {
        name: 'GIF',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: true
    },
    emoji: {
        name: 'Emoji',
        send: true,
        receive: true
    },
    link: {
        name: 'Link',
        link: '/guide/structured-messages/#link-buttons',
        send: true,
        receive: false
    },
    buy: {
        name: 'Buy',
        link: '/guide/structured-messages/#buy-buttons',
        send: true,
        receive: false
    },
    postback: {
        name: 'Postback',
        link: '/guide/structured-messages/#postback-buttons',
        send: true,
        receive: false
    },
    replies: {
        name: 'Replies',
        link: '/guide/structured-messages/#reply-buttons',
        send: true,
        receive: false
    },
    compoundMessages: {
        name: 'Compound Messages',
        link: '/guide/structured-messages/#images-stickers-and-gifs',
        send: true,
        receive: false
    },
    carousel: {
        name: 'Carousel',
        link: '/guide/structured-messages/#carousel-messages',
        send: true,
        receive: false
    },
    typingIndicator: {
        name: 'Typing',
        link: '/guide/sending-messages/#sending-typing-activity-with-the-api',
        send: true,
        receive: true
    },
    readIndicator: {
        name: 'Read',
        send: true,
        receive: true
    },
    conversationStart: {
        name: 'Conversation Start',
        send: false,
        receive: true
    },
    webMessengerLinking: {
        name: 'via Web Messenger',
        link: '/guide/web-messenger#alternate-channels',
        send: false,
        receive: false
    },
    location: {
        name: 'Location',
        send: true,
        receive: true
    },
    locationRequest: {
        name: 'Location Request',
        link: '/guide/structured-messages/#location-request-buttons',
        send: true
    }
};


const channelData = {
    ios: {
        icon: require('../images/channel-icons/ios.svg'),
        name: 'iOS Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NONE
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {},
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    },
    android: {
        icon: require('../images/channel-icons/android.svg'),
        name: 'Android Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NONE
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {},
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    },
    web: {
        icon: require('../images/channel-icons/web.svg'),
        name: 'Web Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NONE
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {},
            webMessengerLinking: SUPPORT_LEVEL.NA,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    },
    twilio: {
        icon: require('../images/channel-icons/twilio.svg'),
        name: 'Twilio',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    messagebird: {
        icon: require('../images/channel-icons/messagebird.svg'),
        name: 'MessageBird',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            gif: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    telegram: {
        icon: require('../images/channel-icons/telegram.svg'),
        name: 'Telegram',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    },
    messenger: {
        icon: require('../images/channel-icons/messenger.svg'),
        name: 'Facebook Messenger',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    },
    line: {
        icon: require('../images/channel-icons/line.svg'),
        name: 'LINE',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NA
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NA
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.FULL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.PARTIAL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    email: {
        icon: require('../images/channel-icons/mailgun.svg'),
        name: 'Mailgun',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NONE
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.NONE,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.PARTIAL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    wechat: {
        icon: require('../images/channel-icons/wechat.svg'),
        name: 'WeChat',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NA
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    viber: {
        icon: require('../images/channel-icons/viber.svg'),
        name: 'Viber',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NONE
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.NONE
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.FULL
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.FULL
            },
            webMessengerLinking: SUPPORT_LEVEL.FULL,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.PARTIAL
            }
        }
    },
    twitter: {
        icon: require('../images/channel-icons/twitter.svg'),
        name: 'Twitter',
        capabilities: {
            text: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            image: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            file: {
                send: SUPPORT_LEVEL.PARTIAL,
                receive: SUPPORT_LEVEL.NA
            },
            gif: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            emoji: {
                send: SUPPORT_LEVEL.FULL,
                receive: SUPPORT_LEVEL.FULL
            },
            link: {
                send: SUPPORT_LEVEL.FULL
            },
            buy: {
                send: SUPPORT_LEVEL.FULL
            },
            postback: {
                send: SUPPORT_LEVEL.FULL
            },
            replies: {
                send: SUPPORT_LEVEL.FULL
            },
            compoundMessages: {
                send: SUPPORT_LEVEL.FULL
            },
            carousel: {
                send: SUPPORT_LEVEL.PARTIAL
            },
            typingIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            readIndicator: {
                send: SUPPORT_LEVEL.NA,
                receive: SUPPORT_LEVEL.NA
            },
            conversationStart: {
                receive: SUPPORT_LEVEL.NA
            },
            webMessengerLinking: SUPPORT_LEVEL.NA,
            location: {
                send: SUPPORT_LEVEL.NONE,
                receive: SUPPORT_LEVEL.FULL
            },
            locationRequest: {
                send: SUPPORT_LEVEL.FULL
            }
        }
    }
};

export const CHANNELS = [
    'ios',
    'android',
    'web',
    'twilio',
    'messagebird',
    'telegram',
    'messenger',
    'twitter',
    'line',
    'email',
    'wechat',
    'viber'
].map((id) => Object.assign({
    id
}, channelData[id]));
