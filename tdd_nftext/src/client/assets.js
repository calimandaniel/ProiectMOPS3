import { client } from "./config";
export const url = "http://localhost:5000";

export const getAssets = async () => {
  const res = await client.get(url + "/record");
  return res;
};

export const getFilteredAssetsByName = async (name) => {
  const res = await client.get(url + "/record/filter/name/" + name);
  return res;
};

export const getAsset = async (id) => {
  const res = await client.get(url + `/record/${id}`);
  return res;
};
