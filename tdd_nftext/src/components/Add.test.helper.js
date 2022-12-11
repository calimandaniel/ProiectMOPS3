import { create } from "apisauce";

export const client = create({
  baseURL: "",
});

export async function add(name, title, description, text) {
  // // When a post request is sent to the create url, we'll add a new record to the database.
  const newPerson = { name: name, title: title, description: description, text: text };

  const response = await client.post("http://localhost:5000/record/add", newPerson);
  if (!response.ok) {
    window.alert("Error adding to database");
    return "0"; // simulate an id
  }

  const { insertedId } = response.data;
  return insertedId;
}
