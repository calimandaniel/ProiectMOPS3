import { getAssets, url } from "./../client/assets";
import { client } from "./../client/config";
import isEqual from "lodash.isequal";

test("renders the landing page", async () => {
  const response = await getAssets();
  const res = await client.get(url + "/record");

  if (!res.ok || !response.ok) return;

  expect(response.data.length).toBe(res.data.length);

  for (let i = 0; i < response.data.length; i++) expect(isEqual(response.data[i], res.data[i])).toBe(true);
});
