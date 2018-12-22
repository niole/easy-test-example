import * as React from 'react';
import { Politician } from './types';

const POLITICIANS: Politician[] = ['trump', 'obama'];

type Props = {
  onSelectPolitician: (event: any) => void;
  selectedPolitician?: Politician;
};

const PoliticianSelector: React.SFC<Props> = props => (
  <select onChange={props.onSelectPolitician} value={props.selectedPolitician}>
    <option value="">Select a politician</option>
    {POLITICIANS.map((name: Politician) => <option value={name} key={name}>{name}</option>)}
  </select>
);

export default PoliticianSelector;
