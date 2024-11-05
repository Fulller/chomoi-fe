import React, { useEffect, useState } from "react";
import { Button, Form, Input, TreeSelect, message, Table, Modal } from "antd";
import CategoryService from "@services/category.service";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import "./CategoryManager.scss";

export default function CategoryManager() {
  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const messageApi = useMessageByApiCode();

  useEffect(() => {
    fetchCategoryTree();
  }, []);

  const fetchCategoryTree = async () => {
    setLoading(true);
    const [result, error] = await CategoryService.getTree();
    setLoading(false);
    if (error) {
      message.error(messageApi(error.code));
      return;
    }

    if (Array.isArray(result.data)) {
      setCategoryTree(result.data);
    } else {
      message.error("Data format error: expected an array");
    }
  };

  const handleAddCategory = async (values) => {
    const parentId = values.parentId || null;
    const newCategory = { name: values.name, parentId };
    const [result, error] = await CategoryService.addCategory(newCategory);
    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      form.resetFields();
      fetchCategoryTree();
    }
  };

  const handleUpdateCategory = async (values) => {
    const [result, error] = await CategoryService.updateCategory(
      selectedCategory.id,
      { name: values.name }
    );
    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      form.resetFields();
      fetchCategoryTree();
      setIsModalVisible(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const [result, error] = await CategoryService.deleteCategory(id);
        if (error) {
          message.error(messageApi(error.code));
        } else {
          message.success(messageApi(result.code));
          fetchCategoryTree();
        }
      },
    });
  };

  const showUpdateModal = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ name: category.name });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showUpdateModal(record)}>
            Cập nhật
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteCategory(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const renderTreeNodes = (data) => {
    if (!Array.isArray(data)) {
      console.error("Expected an array for tree nodes", data);
      return [];
    }

    return data.map((item) => ({
      title: item.name,
      value: item.id,
      children: item.children ? renderTreeNodes(item.children) : [],
    }));
  };

  return (
    <div className="admin-layout-page category-container">
      <h2>Category Management</h2>
      <div className="category-actions">
        <Form
          form={form}
          onFinish={handleAddCategory}
          layout="inline"
          style={{ marginBottom: "20px" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Category Name" style={{ width: "360px" }} />
          </Form.Item>
          <Form.Item name="parentId">
            <TreeSelect
              style={{ width: "360px" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Select Parent Category"
              treeData={renderTreeNodes(categoryTree)}
              allowClear
              showSearch
            />
          </Form.Item>
          <Form.Item>
            <Button className="add-button" type="primary" htmlType="submit">
              Thêm danh mục
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={categoryTree}
        loading={loading}
        pagination={false}
      />

      <Modal
        title="Update Category"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={form.submit}
        className="modal-update-category"
      >
        <Form form={form} onFinish={handleUpdateCategory}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
