import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";

export default function Products() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const onAdd = async () => {
    try {
      const response = await axios.post("http://localhost:3000/product/add", {
        title,
        description,
        quantity,
        category,
        price,
      });

      if (response.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add an item
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <Input value={title} setValue={setTitle} label={"Title"} />
            <Input
              value={description}
              setValue={setDescription}
              label={"Description"}
            />
            <Input
              value={quantity}
              setValue={setQuantity}
              label={"Quantity"}
              type="number"
            />
            <Input value={category} setValue={setCategory} label={"Category"} />
            <Input
              value={price}
              setValue={setPrice}
              label={"Price"}
              type="number"
            />

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onAdd}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
