import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/AuthService";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const token = getToken();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/all");
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/product/delete/${id}`)
      .then((response) => {
        fetchProducts();
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetchProducts();
  }, [navigate, token]);

  return (
    <>
      <button
        className="mb-8 bg-green-500 hover:bg-green-700 text-white py-1 px-6 rounded"
        onClick={() => navigate("/createProduct")}
      >
        Add
      </button>
      <ul className="divide-y divide-gray-100">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {product.description}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {product.quantity}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:items-center">
              <div className="sm:flex-col">
                <p className="text-sm leading-6 text-gray-900">
                  {product.price}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {product.category}
                </p>
              </div>

              <div className="h-50">
                <button
                  className="ml-8 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
