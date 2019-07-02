import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export class ApiInfo extends Component {
  static displayName = ApiInfo.name;

  componentDidMount() {}

  render() {
    const { apiInfo = { headers: {} } } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>API Call Info</CardTitle>
          <CardSubtitle>Route</CardSubtitle>
          <CardText>{apiInfo.route}</CardText>
          <CardSubtitle>Headers</CardSubtitle>
          {apiInfo.options && apiInfo.options.headers
            ? Object.keys(apiInfo.options.headers).map((k, i) => (
                <CardText key={i}>
                  {k}: {apiInfo.options.headers[k]}
                </CardText>
              ))
            : null}
          <CardSubtitle>Response</CardSubtitle>
        </CardBody>
        <CardBody>
          <pre>{JSON.stringify(apiInfo.data, null, 2)}</pre>
        </CardBody>
      </Card>
    );
  }
}
