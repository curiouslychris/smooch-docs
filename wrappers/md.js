import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Page from '../components/Page';
import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';
import catchLinks from '../lib/catch-links';
import { IsOrHasAncestorNode } from '../utils/dom';

// Containers where images shouldn't be openable in a new tab
const IMAGE_CLICK_BLACKLIST = [
    '.logo-row'
];

const openImageHandler = (e) => {
    const {src} = e.target;
    window.open(src);
};

export default class extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        route: PropTypes.object.isRequired
    };

    catchContentLinks = () => {
        const {router} = this.context;
        const node = this._contentNode;
        catchLinks(node, (href) => {
            router.push(href);
        });
    };

    catchImageClicks = () => {
        const node = this._contentNode;
        const imgNodes = node.querySelectorAll('img');

        const blacklistedNodes = node.querySelectorAll(IMAGE_CLICK_BLACKLIST.join(', '));

        // remove it first to make sure it's not bound multiple times
        imgNodes.forEach((n) => n.removeEventListener('click', openImageHandler));

        for (const node of imgNodes) {
            // a valid node is a node that is not in the blacklist
            // and doesn't have an ancestor in the blacklist
            const isValidNode = !Array.of(blacklistedNodes).some((blacklistedNode) => {
                    return IsOrHasAncestorNode(node, blacklistedNode);
            });

            if (isValidNode) {
                node.addEventListener('click', openImageHandler);
            }
        }
    };

    componentDidMount() {
        this.catchContentLinks();
        this.catchImageClicks();
    }

    componentDidUpdate() {
        this.catchContentLinks();
        this.catchImageClicks();
    }

    render() {
        const {route} = this.props;
        const {layout = 'two-column', body, ...data} = route.page.data;
        let Layout;

        switch (layout) {
            case 'three-column':
                Layout = ThreeColumnLayout;
                break;
            case 'two-column':
            default:
                Layout = TwoColumnLayout;
                break;
        }

        return <Page {...this.props}>
                   <Layout {...data}>
                       <div ref={ (c) => this._contentNode = findDOMNode(c) }
                            className='markdown'
                            dangerouslySetInnerHTML={ { __html: body } } />
                   </Layout>
               </Page>;
    }
}
