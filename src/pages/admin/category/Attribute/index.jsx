import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  TreeSelect,
  message,
  Table,
  Modal,
  Checkbox,
} from "antd";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import CategoryService from "@services/category.service";
import AttributeService from "@services/attribute.service";
import useMessageByApiCode from "@hooks/useMessageByApiCode";
import "./AttributeManager.scss";

export default function AttributeManager() {
  const [categoryTree, setCategoryTree] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [formAttribute] = Form.useForm();
  const [formOption] = Form.useForm();
  const messageApi = useMessageByApiCode();
  const [selectedOption, setSelectedOption] = useState(null);

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
      message.error("Dữ liệu sai");
    }
  };

  const fetchAttributes = async (categoryId) => {
    if (!categoryId) return;
    setLoading(true);
    const [result, error] = await AttributeService.getAttributesByCategory(
      categoryId
    );
    setLoading(false);
    if (error) {
      message.error(messageApi(error.code));
      return;
    }
    if (Array.isArray(result.data)) {
      setAttributes(result.data);
    } else {
      message.error("Data format error: expected an array");
    }
  };

  const handleCategoryChange = (categoryId, node) => {
    setSelectedCategoryId(categoryId);
    fetchAttributes(categoryId);
  };

  const handleAddAttribute = () => {
    setSelectedAttribute(null);
    formAttribute.resetFields();
    setIsAttributeModalVisible(true);
  };

  const handleSaveAttribute = async (values) => {
    const data = {
      name: values.name,
      isEnterByHand: values.isEnterByHand || false,
      required: values.required || false,
    };
    let result, error;
    if (selectedAttribute) {
      [result, error] = await AttributeService.updateAttribute(
        selectedAttribute.id,
        data
      );
    } else {
      [result, error] = await AttributeService.addAttribute(
        selectedCategoryId,
        data
      );
    }

    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      fetchAttributes(selectedCategoryId);
      setIsAttributeModalVisible(false);
    }
  };

  const handleEditAttribute = (attribute) => {
    setSelectedAttribute(attribute);
    formAttribute.setFieldsValue({
      name: attribute.name,
      isEnterByHand: attribute.isEnterByHand,
      required: attribute.required,
    });
    setIsAttributeModalVisible(true);
  };

  const handleDeleteAttribute = async (id) => {
    const [result, error] = await AttributeService.deleteAttribute(id);
    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      fetchAttributes(selectedCategoryId);
    }
  };

  const handleAddOption = (attribute) => {
    setSelectedAttribute(attribute);
    setSelectedOption(null);
    formOption.resetFields();
    setIsOptionModalVisible(true);
  };

  const handleSaveOption = async (values) => {
    const data = { value: values.value };
    let result, error;
    if (selectedOption) {
      [result, error] = await AttributeService.updateOption(
        selectedOption.id,
        data
      );
    } else {
      [result, error] = await AttributeService.addOption(
        selectedAttribute.id,
        data
      );
    }

    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      fetchAttributes(selectedCategoryId);
      setIsOptionModalVisible(false);
    }
  };

  const handleEditOption = (option) => {
    setSelectedOption(option);
    formOption.setFieldsValue({ value: option.value });
    setIsOptionModalVisible(true);
  };

  const handleDeleteOption = async (id) => {
    const [result, error] = await AttributeService.deleteOption(id);
    if (error) {
      message.error(messageApi(error.code));
    } else {
      message.success(messageApi(result.code));
      fetchAttributes(selectedCategoryId);
    }
  };

  const columns = [
    {
      title: "Attribute Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Is Enter By Hand",
      dataIndex: "isEnterByHand",
      key: "isEnterByHand",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Options",
      key: "options",
      render: (_, record) => (
        <span>
          {record.options && record.options.length > 0
            ? record.options.map((option) => (
                <div key={option.id}>
                  {option.value}{" "}
                  <Button type="link" onClick={() => handleEditOption(option)}>
                    <AiFillEdit />
                  </Button>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDeleteOption(option.id)}
                  >
                    <AiFillDelete />
                  </Button>
                </div>
              ))
            : "No options"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleAddOption(record)}>
            <AiOutlinePlus />
          </Button>
          <Button type="link" onClick={() => handleEditAttribute(record)}>
            <AiFillEdit />
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteAttribute(record.id)}
          >
            <AiFillDelete />
          </Button>
        </>
      ),
    },
  ];

  const renderTreeNodes = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      title: item.name,
      value: item.id,
      isLeaf: item.isLeaf,
      disabled: !item.isLeaf,
      children: item.children ? renderTreeNodes(item.children) : [],
    }));
  };

  return (
    <div className="admin-layout-page attribute-container">
      <h2>Attribute Management</h2>
      <Form layout="inline" style={{ marginBottom: "20px" }}>
        <Form.Item label="Select Category" name="categoryId">
          <TreeSelect
            style={{ width: "300px" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Select Category"
            treeData={renderTreeNodes(categoryTree)}
            onChange={handleCategoryChange}
            allowClear
            showSearch
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleAddAttribute}
          disabled={!selectedCategoryId}
        >
          Add Attribute
        </Button>
      </Form>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={attributes}
        loading={loading}
        pagination={false}
      />

      {/* Modal for Attribute */}
      <Modal
        title={selectedAttribute ? "Edit Attribute" : "Add Attribute"}
        open={isAttributeModalVisible}
        onCancel={() => setIsAttributeModalVisible(false)}
        onOk={() => formAttribute.submit()}
      >
        <Form form={formAttribute} onFinish={handleSaveAttribute}>
          {" "}
          {/* Form riêng */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter attribute name" }]}
          >
            <Input placeholder="Attribute Name" />
          </Form.Item>
          <Form.Item name="isEnterByHand" valuePropName="checked">
            <Checkbox>Is Enter By Hand</Checkbox>
          </Form.Item>
          <Form.Item name="required" valuePropName="checked">
            <Checkbox>Required</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Option */}
      <Modal
        title={selectedOption ? "Edit Option" : "Add Option"}
        open={isOptionModalVisible}
        onCancel={() => setIsOptionModalVisible(false)}
        onOk={() => formOption.submit()}
      >
        <Form form={formOption} onFinish={handleSaveOption}>
          {" "}
          {/* Form riêng */}
          <Form.Item
            name="value"
            rules={[{ required: true, message: "Please enter option value" }]}
          >
            <Input placeholder="Option Value" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
