import fs from "fs/promises";
import path from "path";
import connectToDB from "../data/database.js";

import {
  admin_director_template,
  admin_location_template,
  admin_template,
  error_template
} from "../views/index.js";

const readData = async (connection, collection_name) => {
  const collection = await connection.database.collection(collection_name).find({}).toArray();
  return collection;
};


const getAdminPage = async (req, res) => {
  try {
    const conn = await connectToDB(); 
    
    if(!conn.success){
      return res.send(
        error_template({ message: conn.message })
      );
    }

    const directors = await readData(conn, "directors");
    const locations = await readData(conn, "locations");

    res.send(admin_template(directors, locations));
  } catch (error) {
    return res.send(
      error_template({ message: "Something went wrong!" })
    );
  }
};


const addAdminData = async (req, res) => {
  const { name, id, type } = req.body;

  try {
    const conn = await connectToDB();

    if (!conn.success) {
      return res.send(
        error_template({ message: conn.message })
      );
    }

    const collection = conn.database.collection(type);
    await collection.insertOne({ name, id });

    res.redirect(`/admin/${id}`);
  } catch (error) {
    console.error("Error in addAdminData:", error);
    res.status(500).send(
      error_template({ message: "Failed to add data." })
    );
  }
};


const getItemData = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await connectToDB();

    if (!conn.success) {
      return res.send(
        error_template({ message: conn.message })
      );
    }

    const directors = await conn.database.collection("directors").findOne({ id });
    if (directors) {
      return res.send(admin_director_template(directors));
    }

    const locations = await conn.database.collection("locations").findOne({ id });
    if (locations) {
      return res.send(admin_location_template(locations));
    }

    res.status(404).send(
      error_template({ message: "Item not found." })
    );
  } catch (error) {
    console.error("Error in getItemData:", error);
    res.status(500).send(
      error_template({ message: "Failed to fetch item data." })
    );
  }
};


const deleteItemData = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await connectToDB();

    if (!conn.success) {
      return res.send(
        error_template({ message: conn.message })
      );
    }

    const directorsResult = await conn.database
      .collection("directors")
      .deleteOne({ id });

    if (directorsResult.deletedCount > 0) {
      return res.send();
    }

    const locationsResult = await conn.database
      .collection("locations")
      .deleteOne({ id });

    if (locationsResult.deletedCount > 0) {
      return res.send();
    }

    res.status(404).send(
      error_template({ message: "Item not found." })
    );
  } catch (error) {
    console.error("Error in deleteItemData:", error);
    res.status(500).send(
      error_template({ message: "Failed to delete item." })
    );
  }
};



export { getAdminPage, addAdminData, getItemData, deleteItemData, readData };