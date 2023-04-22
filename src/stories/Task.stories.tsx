import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {action} from '@storybook/addon-actions'
import Task from '../Task';

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  tags: ["autodocs"],
  args: {
    task: { id: "1", title: "JS", isDone: false },
    removeTask: action("removeTask"),
    changeTaskStatus: action("chabgeTskStatus"),
    changeTaskTitle: action("changeTaskTitle"),
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDone: Story = {
    args: {

    }

};

export const TaskIsDone: Story = {
    args: {
        task: {id: '1', title: 'JS', isDone: true}
    }

};




