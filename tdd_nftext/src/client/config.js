import { create } from "apisauce";

const PINATA_JWT = process.env.JWT_KEY;

export const client = create({
  baseURL: "",
  headers: { Authorization: "Bearer " + PINATA_JWT },
});