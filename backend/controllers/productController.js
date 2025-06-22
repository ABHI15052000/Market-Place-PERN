import { sql } from "../config/dbConfig.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
    `;

    console.log("Products : ", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error while fetching the products : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedProduct = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (selectedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: selectedProduct[0] });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sql`
        INSERT INTO  products (name, price, image)
        VALUES (${name}, ${price}, ${image})
        RETURNING *
    `;
    console.log("Newly added product : ", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in create product : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
        UPDATE products
        SET name=${name}, price=${price}, image=${image}
        WHERE id=${id}
        RETURNING *
    `;

    if (updateProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updating the product : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
    `;

    if (deletedProduct.length === 0) {
      console.log(
        "Item which you want to delete is not present in the products table "
      );
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(201).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleting the product ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
