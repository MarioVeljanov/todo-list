import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {action} from '@storybook/addon-actions'
import AppWithRedux from '../AppWithRedux';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ReduxStoreProviderDecorator } from '../store/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
  title: "TODOLISTS/AppWithRedux",
  component: AppWithRedux,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWitRedux: Story = {
  render: () => (

      <AppWithRedux/>
    
  ),
};
// export const AppWitRedux: Story = {
//   render: () => (
//     <Provider store={store}>
//       <AppWithRedux/>
//     </Provider>
//   ),
// };






