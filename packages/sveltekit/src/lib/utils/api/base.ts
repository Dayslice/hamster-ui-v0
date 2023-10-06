async function get<T = any>(path: string): Promise<T> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://hiveai-demo-da68357eec9a.herokuapp.com';
  const response = await fetch(`${url}/${path}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

// ... other imports ...

async function post<T = any>(path: string, data: any): Promise<T> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://hiveai-demo-da68357eec9a.herokuapp.com';
  const response = await fetch(`${url}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // add other headers as needed
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

async function patch<T = any>(path: string, data: any): Promise<T> {
  const url = import.meta.env.DEV ? 'http://localhost:3001' : 'https://hiveai-demo-da68357eec9a.herokuapp.com';
  const response = await fetch(`${url}/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // add other headers as needed
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

// ... other functions ...

export { get, post, patch };
