import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    );
    const products = response.data;
    return products;
  } catch (error) {
    console.error(error);
  }
}
