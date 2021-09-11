import { render, fireEvent } from '@testing-library/react';
import App from './App';


describe('App ready', () => {
  it('renders button, input and list', () => {
    const {container, getByText, getByTestId } = render(<App />);

    const buttonElement = getByText(/Add Task/i);
    const inputElement = getByTestId('task-input');
    const listElement = container.querySelector(".task-list");

    expect(buttonElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });
})

describe('Given empty ToDo list', () => {
  it('Add a todo task', async () => {
    const { container, getByText, getByTestId } = render(<App />);

    const inputElement = getByTestId('task-input');
    const submitBtn = getByText(/Add Task/i);
    const listElement = container.querySelector(".task-list");

    fireEvent.change(inputElement, { 'target': { 'value': 'buy some milk' } });
    fireEvent.click(submitBtn);
    // await wait(() => null);

    const addedTask = listElement.querySelector('div').lastChild

    expect(addedTask.textContent).toEqual('buy some milk');
  });
})