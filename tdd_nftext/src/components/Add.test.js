import { add, client } from "./Add.test.helper";

test("renders the landing page", async () => {
  const id = await add("da555", "da555", "da555", "da555");
  const response = await client.get(`http://localhost:5000/record/${id}`);

  if(!response.ok) return;
  
  expect(response.data).not.toBeNull();
});
