import { Component } from 'react';
import { Linking } from 'expo';
import { withRouter } from 'react-router-native';

class LinkRedirector extends Component {
    componentDidMount = () => {
        Linking.parseInitialURLAsync().then(({ path, queryParams }) => {
            this.props.history.push(`/${path}`);
        });

        Linking.addEventListener('url', ({ url }) => {
            const { path, queryParams } = Linking.parse(url);
            this.props.history.push(`/${path}`);
        });
    };

    render() {
        return null;
    }
}

export default withRouter(LinkRedirector);
