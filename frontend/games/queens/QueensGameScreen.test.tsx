import React from 'react';
import { render } from '@testing-library/react-native';
import { QueensGameScreen } from './QueensGameScreen';

test('renderiza título do Queens', () => {
  const { getByText } = render(<QueensGameScreen />);
  expect(getByText('Queens')).toBeTruthy();
});