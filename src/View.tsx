import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { Politician } from './types';
import Loader from './Loader';
import PoliticianSelector from './PoliticianSelector';

type StateProps = {
  selectedPolitician?: Politician;
  tweets: string[];
  loading: boolean;
};

type HandlerProps = {
  onSelectPolitician: (value?: any) => void;
};

type Props = StateProps & HandlerProps;

const TWEET_MAP: { [key: string]: string[] } = {
  trump: ['Mexico', 'China', 'Kittens'],
  obama: ['Change', 'Dreamers', 'Obamacare'],
};

const getPoliticianTweets = (politician: Politician, resolve: (tweets: string[]) => void) =>
  setTimeout(() => {
    resolve(TWEET_MAP[politician]);
  }, 1000);

/**
 * View is now a stateless react element, whose different states are much easier to test than before.
 */
type TweetView = React.SFC<Props>;
export const View: TweetView = ({ onSelectPolitician, loading, tweets, selectedPolitician }) => (
  <MuiThemeProvider>
    <Card>
      <CardHeader title={<span>Tweets for...
          <PoliticianSelector
            onSelectPolitician={onSelectPolitician}
            selectedPolitician={selectedPolitician}
          />
        </span>}
      />
      <CardText>
        {loading ? <Loader /> : tweets.map((tweet: string) => <div key={tweet}>{tweet}</div>)}
      </CardText>
    </Card>
  </MuiThemeProvider>
);

const withApiHandlers = (Component: TweetView) => class extends React.Component<{}, StateProps> {
  state = {
    selectedPolitician: undefined,
    tweets: [],
    loading: false,
  };

  /**
   * withApiHandlers contains the state that was once in View and now drives all asynchronous
   * interactions.
   */
  selectPolitician = (value?: any) => {
    const selectedPolitician: Politician | undefined = value;

    if (selectedPolitician) {
      this.setState({ loading: true, selectedPolitician });
      getPoliticianTweets(selectedPolitician, (tweets: string[]) => {
        this.setState({ loading: false, tweets });
      });
    } else {
      this.setState({ selectedPolitician: undefined, tweets: [] });
    }
  }

  render() {
    const { loading, tweets, selectedPolitician } = this.state;
    return (
      <Component
        loading={loading}
        tweets={tweets}
        selectedPolitician={selectedPolitician}
        onSelectPolitician={this.selectPolitician}
      />
    );
  }
};

export default withApiHandlers(View);
