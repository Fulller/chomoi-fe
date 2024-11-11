import React from "react";
import { Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useProduct from "../.state/useProduct";
import ErrorMessage from "../ErrorMessage";

const UploadOneFile = ({ name, label, ...props }) => {
  const {
    data: { [name]: file },
    dispatch,
  } = useProduct();

  const handleChange = ({ file: fileE }) => {
    dispatch({ type: "FIELD/UPDATE", payload: { field: name, value: fileE } });
  };

  const renderFile = () => {
    if (!file) return null;
    const isImage = file instanceof File && file.type.startsWith("image/");
    const isVideo = file instanceof File && file.type.startsWith("video/");
    if (isImage) {
      return (
        <Image src={URL.createObjectURL(file)} alt="uploaded" height={200} />
      );
    }
    if (isVideo) {
      return (
        <video width={200} controls>
          <source src={URL.createObjectURL(file)} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    }
    return null;
  };

  return (
    <div>
      <div>
        <p>{label}</p>
        {renderFile()}
        <Upload
          onChange={handleChange}
          showUploadList={false}
          beforeUpload={() => false}
          {...props}
        >
          <Button icon={<UploadOutlined />}>
            {file ? "Change" : "Upload"}
          </Button>
        </Upload>
      </div>
      <ErrorMessage field={name} />
    </div>
  );
};

export default UploadOneFile;
