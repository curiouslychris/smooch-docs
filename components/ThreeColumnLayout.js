import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Sidebar from './Sidebar';

export default class extends Component {
    render() {
        const {section} = this.props;
        return <Grid>
                   <Row>
                       <Col sm={ 4 }
                            lg={ 3 }
                            xsHidden>
                       <Sidebar section={ section } />
                       </Col>
                       <Col xs={ 12 }
                            sm={ 8 }
                            lg={ 9 }
                            className='content'>
                       { this.props.children }
                       </Col>
                   </Row>
               </Grid>;
    }
}
