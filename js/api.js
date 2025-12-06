async function apiCall(endpoint, method = "GET", body = null) {
  const res = await fetch(`/api/${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return res.json();
}
