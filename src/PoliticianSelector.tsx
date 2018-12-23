import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Politician } from './types';

const selectionAdapter = (onSelect: (value: any) => void) => (event: any, index: number, value: any) => onSelect(value);

const POLITICIANS: Politician[] = ['trump', 'obama'];

type Props = {
  onSelectPolitician: (value: any) => void;
  selectedPolitician?: Politician;
};

const PoliticianSelector: React.SFC<Props> = props => (
  <SelectField
    onChange={selectionAdapter(props.onSelectPolitician)}
    value={props.selectedPolitician}
  >
    {POLITICIANS.map((name: Politician) => <MenuItem value={name} key={name} primaryText={name} />)}
  </SelectField>
);

export default PoliticianSelector;
