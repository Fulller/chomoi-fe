import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Content } = Layout;
import { Element } from "react-scroll";
import GeneralInfo from "./GeneralInfor";
import DetailInfo from "./DetailInfor";
import Selling from "./SellingInfor";
import { useSelector, useDispatch } from "react-redux";
import createProductSelector from "@redux/selector/product.create.selector";
import createProductSlice from "@redux/slices/product.create.slice";
import createProductSchema from "@validations/product/createProductSchema";
import AttributeService from "@services/attribute.service";
import UploadsService from "@services/uploads.service";
import ProductService from "@services/product.service";
import { Spin } from "antd";
import _ from "lodash";
import ".scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineConsoleSql } from "react-icons/ai";

const CreateProductPage = () => {
  const state = useSelector(createProductSelector.get);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, variations } = state;
  const [attributes, setAttributes] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(createProductSlice.actions.setDefault());
    };
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchAttributes();
    }
  }, [categoryId]);

  async function fetchAttributes() {
    const [result, error] = await AttributeService.getAttributesByCategory(
      categoryId
    );
    if (error) return;

    setAttributes(result.data);
  }

  async function handleValidate() {
    try {
      await createProductSchema({ attributes, variations }).validateAsync(
        state,
        {
          abortEarly: false,
        }
      );
      return true;
    } catch (error) {
      dispatch(createProductSlice.actions.setErrorEmpty());
      error.details.forEach(({ path, message }) => {
        const field = path.join(".");
        dispatch(
          createProductSlice.actions.setErrorField({ field, value: message })
        );
      });
      return false;
    }
  }

  async function handleUploadMedia() {
    const isSimple = state.isSimple;
    const [thumbnailFile, videoFile, imageFiles, firstVariationImagesFiles] =
      await Promise.all([
        UploadsService.blobUrlToFile(state.thumbnail, "thumbnail.jpg"),
        state.video
          ? UploadsService.blobUrlToFile(state.video, "video.mp4")
          : null,
        await Promise.all(
          state.imagePaths.map((image, index) =>
            UploadsService.blobUrlToFile(image, `image_${index}.jpg`)
          )
        ),
        isSimple
          ? null
          : await Promise.all(
              state.variations[0]?.images?.map((url, index) =>
                UploadsService.blobUrlToFile(
                  url,
                  `variations_image_${index}.jpg`
                )
              )
            ),
      ]);
    const hasImages = imageFiles && imageFiles.length > 0;

    const uploadTasks = [
      UploadsService.image(thumbnailFile),
      videoFile
        ? UploadsService.video(videoFile)
        : Promise.resolve([null, null]),
      hasImages
        ? UploadsService.images(imageFiles)
        : Promise.resolve([null, null]),
      isSimple
        ? Promise.resolve([null, null])
        : UploadsService.images(firstVariationImagesFiles),
    ];

    const [
      [uploadThumbResult, uploadThumbError],
      [uploadVideoResult, uploadVideoError],
      [uploadImagesresult, uploadImagesError],
      [uploadfirstVariationImageResult, uploadfirstVariationImageError],
    ] = await Promise.all(uploadTasks);

    if (
      uploadThumbError ||
      uploadVideoError ||
      uploadImagesError ||
      uploadfirstVariationImageError
    ) {
      return null;
    }
    const skus = isSimple
      ? state.skus.map((sku) => {
          return {
            ...sku,
            image: uploadThumbResult.data,
            variation: "0",
          };
        })
      : state.skus.map((sku) => {
          const imageIndex = sku.variation.split(" ")[0];
          const image = uploadfirstVariationImageResult.data[imageIndex];
          return {
            ...sku,
            image,
          };
        });

    return {
      thumbnail: uploadThumbResult.data,
      video: uploadVideoResult?.data,
      imagePaths: uploadImagesresult.data,
      skus: skus.filter((sku) => sku.stock > 0),
    };
  }

  const handleSubmit = async () => {
    setIsloading(true);
    const isFormOK = await handleValidate();  
    if (!isFormOK) {
      setIsloading(false);
      return;
    }
    const updatedState = await handleUploadMedia();
    if (!updatedState) {
      setIsloading(false);
      return;
    }
    const [createProductResult, createProductError] =
      await ProductService.create({
        ...state,
        ...updatedState,
        productAttributes: state.productAttributes.filter((pA) => pA.value),
      });
    if (createProductError) {
      console.error(createProductError);
      setIsloading(false);
      return;
    }
    navigate(`/@shop/product/edit/${createProductResult.data.id}`);
  };

  return (
    <Spin spinning={isLoading}>
      <div id="create-product-page">
        <Content className="content-container">
          <Element name="general-info" className="section">
            <h2 className="section-label">Thông tin cơ bản</h2>
            <div className="section-content">
              <GeneralInfo />
            </div>
          </Element>
          <Element name="detail-info" className="section">
            <h2 className="section-label">Thông tin chi tiết</h2>
            <div className="section-content">
              <DetailInfo />
            </div>
          </Element>
          <Element name="selling-info" className="section">
            <h2 className="section-label">Thông tin bán hàng</h2>
            <div className="section-content">
              <Selling />
            </div>
          </Element>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            className="save-button"
            onClick={handleSubmit}
          >
            Save Product
          </Button>
        </Content>
      </div>
    </Spin>
  );
};

export default CreateProductPage;
