let baseUrl = process.env.API_HOST;
console.log('baseUrl', baseUrl)

// TODO fix
if (!baseUrl) {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    baseUrl = "http://localhost:5000/api";
  } else {
    baseUrl = "http://144.126.244.239/api";
  }
}

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
  console.log('listTask > baseUrl', baseUrl)
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
