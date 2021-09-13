const baseUrl = "http://localhost:8080/api";

export async function addTask(task) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  };
  const response = await fetch(`${baseUrl}/task`, requestOptions);

  const result = await response.json();
  if (response.status >= 400) {
    throw result.error;
  }
  return result.message;
}

export async function listTasks(userId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${baseUrl}/task?userId=${userId}`,
    requestOptions
  );
  const result = await response.json();
  if (response.status >= 400) {
    throw result.error;
  }
  return result.message;
}
