import { getAssets, getFilteredAssetsByName, url } from "./../client/assets";
import { client } from "./../client/config";
import isEqual from "lodash.isequal";

test("renders the landing page", async () => {
  const name = "name";
  const response = await getFilteredAssetsByName(name);
  const res = await getAssets();

  if (!res.ok || !response.ok) return;

  const filtered = res.data.filter((asset) => asset.name === name);

  expect(response.data.length).toBe(filtered.length);

  for (let i = 0; i < response.data.length; i++) expect(isEqual(response.data[i], filtered[i])).toBe(true);
});
