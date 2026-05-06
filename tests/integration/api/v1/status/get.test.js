test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3001/api/v1/status");
  expect(response.status).toBe(200);
});

test("Get to /api/v1/status should return the correct message", async () => {
  const response = await fetch("http://localhost:3001/api/v1/status");
  const data = await response.json();
  expect(data).toEqual({
    chave: "alunos do curso.dev são pessoas acima da média",
  });
});
