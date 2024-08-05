import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { BLOG_MEMBER } from '../../routes/constant';
import Select from 'react-select'; 
import { useGetAllCategory, useCreateBlog } from '../../api/blogApi';

function CreateBlog() {
  const navigate = useNavigate()
  const user = useSelector(selectUser);
  const ownerId = user.userId;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [categoryID, setCategoryID] = useState(null); 

  const { data: categories, isLoading, isError } = useGetAllCategory();
  const { mutate: createBlog } = useCreateBlog();

  const categoryOptions = categories?.map(category => ({
    value: category.id,
    label: category.name,
  })) || [];

  const handleSubmit = (event) => {
    event.preventDefault();

    const dateCreated = new Date().toISOString();

    const newBlog = {
      ownerId,
      name,
      description,
      status,
      categoryID,
      dateCreated,
    };

    createBlog(newBlog, {
      onSuccess: () => {
        navigate(`/${BLOG_MEMBER}`)
      },
      onError: (error) => {
        console.error('Error creating blog:', error);
      },
    });
  };

  return (
    <div className="mx-12 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Blog Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="categoryID" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          {isLoading ? (
            <p>Loading categories...</p>
          ) : isError ? (
            <p>Error loading categories</p>
          ) : (
            <Select
              id="categoryID"
              options={categoryOptions}
              onChange={(selectedOption) => setCategoryID(selectedOption?.value || null)}
              value={categoryOptions.find(option => option.value === categoryID)}
              placeholder="Select a category"
              isClearable
            />
          )}
        </div>
        <button
          type="button"
          className="mt-4 bg-neutral-300 text-black p-2 rounded-md mr-2"
        >
          <NavLink to={`/${BLOG_MEMBER}`}>
            Cancel
          </NavLink>
        </button>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
