import {
  act,
  waitFor,
  render,
  fireEvent,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from ".";
import { listTasks, addTask } from "./api";

jest.mock("./api");

describe("App ready", () => {
  beforeEach(() => {
    listTasks.mockReturnValue([{ id: 1, user_id: 1, name: "Task 1" }]);
  });

  it("Render button, input and list", async () => {

    await act(async () => {
      const { getByTestId, getByText } = render(<App />);
      const inputElement = getByTestId("task-input");
      const buttonElement = getByText(/Add Task/i);
      const listElement = getByTestId("list");
      
      expect(buttonElement).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
      expect(listElement).toBeInTheDocument();
    });
  });

  it("List tasks when mounted", async () => {

    await act(async () => {
      render(<App />);
    });
    expect(listTasks).toBeCalled();
    const listNode = screen.getByTestId("list");
    expect(listNode.children).toHaveLength(1);
    expect(listNode.children[0].textContent).toBe("Task 1");
  });

  it('Add a todo task top of task list', async () => {
    addTask.mockResolvedValue({id:2, user_id: 1, name: "buy some milk"});

    await act(async () => {
      render(<App />);
    })

    const inputElement = screen.getByTestId('task-input');
    const submitBtn = screen.getByText(/Add Task/i);

    await act( async () => {
      userEvent.type(inputElement, 'buy some milk');
    });

    await act( async () => {
      fireEvent.click(submitBtn);
    });

    const listNode = await waitFor(() => screen.getByTestId('list'));
    expect(listNode.children).toHaveLength(2);
    expect(listNode.children[0].textContent).toBe("buy some milk");
  });

  it('Don\'t add task when input empty', async () => {
    await act(async () => {
      render(<App />);
    })

    const submitBtn = screen.getByText(/Add Task/i);

    await act( async () => {
      fireEvent.click(submitBtn);
    });

    expect(addTask).not.toBeCalled();
    expect(screen.getByText(/Add Task/i).closest('button')).toBeDisabled();
  });
});
