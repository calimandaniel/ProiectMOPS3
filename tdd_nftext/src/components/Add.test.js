import { render, screen } from '@testing-library/react';
import Add from './Add';
import App from '../App.js';
import { Connect } from './Add';
import { MetaMaskProvider } from "metamask-react";

test('renders the landing page', () => {
    render(
        <MetaMaskProvider>
          <Connect />
        </MetaMaskProvider>,
      );
    const linkElement = screen.getByText("Connected");
    expect(linkElement).toBeInTheDocument();
  });