import * as React from 'react';
import { mount } from 'enzyme';
import SelectField from 'material-ui/SelectField';
import { CardText } from 'material-ui/Card';
import PoliticianSelector from '../PoliticianSelector';
import Loader from '../Loader';
import { View } from '../View';

const defaultProps = {
  selectedPolitician: undefined,
  tweets: [],
  loading: false,
  onSelectPolitician: () => undefined,
};

test('should render', () => {
  const wrapper = mount(<View {...defaultProps} />);
  expect(wrapper.find(View)).toHaveLength(1);
});

test('should show loader if in loading state', () => {
  const wrapper = mount(<View {...defaultProps} loading={true} />);
  expect(wrapper.find(Loader)).toHaveLength(1);
});

test('should not show loader if not in loading state', () => {
  const wrapper = mount(<View {...defaultProps} loading={false} />);
  expect(wrapper.find(Loader)).toHaveLength(0);
});

test('should show selected politician in selector if selected', () => {
  const wrapper = mount(<View {...defaultProps} selectedPolitician="trump" />);
  expect(wrapper.find(PoliticianSelector).text().trim()).toBe('trump');
});

test('should show tweets if provided', () => {
  const tweets = ['tweet1', 'tweet2'];
  const wrapper = mount(<View {...defaultProps} tweets={tweets}/>);
  expect(wrapper.find(CardText).text().trim()).toBe(tweets.join(''));
});

test('should trigger onSelectPolitician if select onChange is triggered', () => {
  const onSelectPolitician = jest.fn();
  const wrapper = mount(<View {...defaultProps} onSelectPolitician={onSelectPolitician}/>);

  /**
   * The point is to test the interfaces that we have created, not whether or not
   * the material ui select field works as expected
   */
  wrapper.find(SelectField).props().onChange('trump', 1, 'trump');
  expect(onSelectPolitician).toHaveBeenCalledTimes(1);
});
