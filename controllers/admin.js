import fs from "fs/promises";
import path from "path";
import {
  admin_director_template,
  admin_location_template,
  admin_template,
} from "../views/index.js";

const readData = async (filename) => {
  const filePath = path.join("data", `${filename}.json`);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeData = async (filename, data) => {
  const filePath = path.join("data", `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return;
};

const getAdminPage = async (req, res) => {
  const directors = await readData("directors");
  const locations = await readData("locations");
  res.send(admin_template(directors, locations));
};

const addAdminData = async (req, res) => {
  const { name, id, type } = req.body;
  const data = await readData(type);
  data.push({ name, id });
  await writeData(type, data);

  res.redirect(`/admin/${id}`);
};

const getItemData = async (req, res) => {
  const directors = await readData("directors");
  const locations = await readData("locations");

  const { id } = req.params;
  const director = directors.find((d) => d.id === id);
  if (director) {
    res.send(admin_director_template(director));
  }

  const location = locations.find((l) => l.id === id);
  if (location) {
    res.send(admin_location_template(location));
  }
};

const deleteItemData = async (req, res) => {
  const { id } = req.params;

  const directors = await readData("directors");
  const locations = await readData("locations");

  const director_idx = directors.findIndex((b) => String(b.id) === String(id));
  if (director_idx !== -1) {
    directors.splice(director_idx, 1);
    await writeData("directors", directors);
    res.send();
    return;
  }

  const location_idx = locations.findIndex((b) => String(b.id) === String(id));
  if (location_idx !== -1) {
    locations.splice(location_idx, 1);
    await writeData("locations", locations);
    res.send();
  }
};

export { getAdminPage, addAdminData, getItemData, deleteItemData };
