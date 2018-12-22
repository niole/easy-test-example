import * as React from 'react';
import './App.css';
import {
  Text,
  Card,
  Heading,
} from 'rebass';

type Politician = 'trump' | 'obama' | '';

type State = {
  selectedPolitician?: Politician;
  tweets: string[];
  loading: boolean;
};

const TWEET_MAP: { [key: string]: string[] } = {
  trump: ['Mexico', 'China', 'Kittens'],
  obama: ['Change', 'Dreamers', 'Obamacare'],
};

const POLITICIANS: Politician[] = ['trump', 'obama'];

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
  selectPolitician = (event: any) => {
    const selectedPolitician: Politician = event.target.value;

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
      <Card>
        <Heading>
          Tweets for {' '}
          <select onChange={this.selectPolitician} value={selectedPolitician} defaultValue={selectedPolitician}>
            <option value="">Select a politician</option>
            {POLITICIANS.map((name: Politician) => <option value={name} key={name}>{name}</option>)}
          </select>
        </Heading>
        <Card>
          {loading ? <div className="loader" /> : tweets.map((tweet: string) => <Text key={tweet}>{tweet}</Text>)}
        </Card>
      </Card>
    );
  }
}

export default View;
