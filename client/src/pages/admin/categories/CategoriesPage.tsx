import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../../../interfaces/CategoriesInterface'; // Đảm bảo import Category interface từ đúng đường dẫn
import CategoryForm from './CategoryForm'; // Import component để thêm/sửa danh mục

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:8080/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error fetching categories
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${categoryId}`);
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error deleting category
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Categories</h2>
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button className="btn btn-info me-2" onClick={() => handleEditCategory(category)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryForm
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        fetchCategories={fetchCategories}
      />
    </div>
  );
};

export default CategoriesPage;
