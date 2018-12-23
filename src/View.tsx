import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { Politician } from './types';
import Loader from './Loader';
import PoliticianSelector from './PoliticianSelector';

type State = {
  selectedPolitician?: Politician;
  tweets: string[];
  loading: boolean;
};

const TWEET_MAP: { [key: string]: string[] } = {
  trump: ['Mexico', 'China', 'Kittens'],
  obama: ['Change', 'Dreamers', 'Obamacare'],
};

const getPoliticianTweets = (politician: Politician, resolve: (tweets: string[]) => void) =>
  setTimeout(() => {
    resolve(TWEET_MAP[politician]);
  }, 1000);

/**
 * This view contains a dropdown, which lets users select
 * a politician whose tweets they want to read
 * The tweets show up in the main part of the view
 * and the dropdown lives in a toolbar at the top of the view.
 */
class View extends React.Component<{}, State> {
  state = {
    selectedPolitician: undefined,
    tweets: [],
    loading: false,
  };

  /**
   * Both the visualized tweets and the loading state are a product
   * of the asynchronous `getPoliticianTweets` operation which is triggered by
   * `selectPolitician`
   *
   * Our refactoring goal is to separate `View` into pieces such that
   * this asynchronous operation will be represented in "spirit" but not in
   * our tests in practice.
   */
  selectPolitician = (value: Politician) => {
    const selectedPolitician: Politician = value;

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
      <MuiThemeProvider>
        <Card>
          <CardHeader title={<span>Tweets for...
              <PoliticianSelector
                onSelectPolitician={this.selectPolitician}
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
  }
}

export default View;
