import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Bootstrap UI heading', () => {
  render(<App />);
  const heading = screen.getByText(/bootstrap ui demo/i);
  expect(heading).toBeInTheDocument();
});
