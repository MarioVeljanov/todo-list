import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {action} from '@storybook/addon-actions'
import EdittableSpan from '../EdittableSpan';

const meta: Meta<typeof EdittableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EdittableSpan,
  tags: ["autodocs"],
  args: {
    title: "EditableSpan",
    changeTitle: action('editTitle')
  },
};

export default meta;
type Story = StoryObj<typeof EdittableSpan>;

export const EditableSpan: Story = {
  args: {},
};






