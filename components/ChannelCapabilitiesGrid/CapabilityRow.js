import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import hat from 'hat';

import Row from './Row';
import Cell from './Cell';
import Arrow from './Arrow';

import { getSupportIndicator } from './utils';
import { CHANNELS, CAPABILITIES } from '../../data/channelCapabilities';

export default class CapabilityRow extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    generateDirectionCell() {
        const {capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        let directionCell;
        if (capabilityDetails.send && capabilityDetails.receive) {
            directionCell = <Cell className='direction-cell'
                                  divided>
                                <div className='top-part'>
                                    <Arrow direction='right' />
                                </div>
                                <div className='bottom-part'>
                                    <Arrow direction='left' />
                                </div>
                            </Cell>;
        } else if (capabilityDetails.send) {
            directionCell = <Cell className='direction-cell'>
                                <Arrow direction='right' />
                            </Cell>;
        } else if (capabilityDetails.receive) {
            directionCell = <Cell className='direction-cell'>
                                <Arrow direction='left' />
                            </Cell>;
        } else {
            directionCell = <Cell className='direction-cell'
                                  divided>
                            </Cell>;
        }

        return directionCell;
    }

    generateInformationOverlay(information) {
        if (!information) {
            return null;
        }

        return <Popover id={ hat() }>
                   { information }
               </Popover>;
    }

    generateCells() {
        const {capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        return CHANNELS.map((channel, i) => {
            const support = channel.capabilities[capability];

            let cell;
            const sendPopover = this.generateInformationOverlay(support.sendInformation);
            const receivePopover = this.generateInformationOverlay(support.receiveInformation);
            const infoPopover = this.generateInformationOverlay(support.information);
            if (capabilityDetails.send && capabilityDetails.receive) {
                const topPart = sendPopover ?
                    <OverlayTrigger rootClose
                                    trigger='click'
                                    placement='top'
                                    overlay={ sendPopover }
                                    className='top-part'>
                        { getSupportIndicator(support.send, true) }
                    </OverlayTrigger> :
                    <div className='top-part'>
                        { getSupportIndicator(support.send) }
                    </div>;

                const bottomPart = receivePopover ?
                    <OverlayTrigger rootClose
                                    trigger='click'
                                    placement='top'
                                    overlay={ receivePopover }
                                    className='bottom-part'>
                        { getSupportIndicator(support.receive, true) }
                    </OverlayTrigger> :
                    <div className='bottom-part'>
                        { getSupportIndicator(support.receive) }
                    </div>;

                cell = <Cell key={ i }
                             divided
                             isContent>
                           { topPart }
                           { bottomPart }
                       </Cell>;
            } else if (capabilityDetails.send) {
                const content = sendPopover ?
                    <OverlayTrigger rootClose
                                    trigger='click'
                                    placement='top'
                                    overlay={ sendPopover }>
                        { getSupportIndicator(support.send, true) }
                    </OverlayTrigger> :
                    getSupportIndicator(support.send);

                cell = <Cell key={ i }
                             isContent>
                           { content }
                       </Cell>;
            } else if (capabilityDetails.receive) {
                const content = receivePopover ?
                    <OverlayTrigger rootClose
                                    trigger='click'
                                    placement='top'
                                    overlay={ receivePopover }
                                    className='bottom-part'>
                        { getSupportIndicator(support.receive, true) }
                    </OverlayTrigger> :
                    getSupportIndicator(support.receive);

                cell = <Cell key={ i }
                             isContent>
                           { content }
                       </Cell>;
            } else if (support.level) {
                const content = infoPopover ?
                    <OverlayTrigger rootClose
                                    trigger='click'
                                    placement='top'
                                    overlay={ infoPopover }>
                        { getSupportIndicator(support.level, true) }
                    </OverlayTrigger> :
                    getSupportIndicator(support.level);
                cell = <Cell key={ i }
                             isContent>
                           { content }
                       </Cell>;
            } else {
                cell = <Cell key={ i }
                             isContent>
                           { getSupportIndicator(support) }
                       </Cell>;
            }

            return cell;
        });
    }


    render() {
        const {className, capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        const classNames = ['grid-row'];
        if (className) {
            classNames.push(className);
        }


        return <Row className={ classNames.join(' ') }>
                   <Cell verticalHeader>
                       <Cell alignLeft
                             noBorder>
                           { capabilityDetails.link ?
                                 <Link to={ capabilityDetails.link }
                                       target={ capabilityDetails.link.startsWith('/') ? undefined : '_blank' }>
                                 { capabilityDetails.name }
                                 </Link> :
                                 capabilityDetails.name }
                       </Cell>
                       { this.generateDirectionCell() }
                   </Cell>
                   { this.generateCells() }
               </Row>;
    }
}
