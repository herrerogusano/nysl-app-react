import React from 'react';
import { terms } from '../../utilities/Utilities';
import { TermButton } from './TermButton';

export const TermSelector = ({term, setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms).map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      ))
    }
    </div>
  );


