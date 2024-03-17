import React, { useState } from "react";



const AddBrands = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm category mới vào cơ sở dữ liệu
    console.log(name, description, image);
    // Xóa nội dung các trường nhập liệu
    setName("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-gray-900 font-bold text-3xl">Add Category</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium text-sm mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-600"
              placeholder="Enter the category name"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium text-sm mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-600"
              placeholder="Enter the category description"
              value={description}
              onChange={handleDescription}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-600 font-medium text-sm mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-600"
              placeholder="Enter the category image URL"
              value={image}
              onChange={handleImage}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 text-sm"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrands;