import 'autotrack/lib/plugins/url-change-tracker';
import { browserHistory } from 'react-router';
import { anchorate } from 'anchorate';

const REDIRECTS = {
    '/javascript': '/guide/web-messenger/',
    '/ios': '/guide/native-ios-sdk/',
    '/android': '/guide/native-android-sdk/'
};

export const onRouteUpdate = ({pathname}) => {
    if (browserHistory) {
        const redirect = REDIRECTS[pathname];

        if (redirect) {
            browserHistory.push(redirect);
        }
    }
};

export const onRouteChange = () => {
  anchorate();
};
