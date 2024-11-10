import useProduct from "../.state/useProduct";
import Field from "./Field";
import Category from "./Category";
import Upload from "./Upload";

function GeneralInformation() {
  const { data } = useProduct();
  console.log(data);
  return (
    <div>
      <Field name="name" label="Tiêu đều sản phẩm" required />
      <Field
        name="description"
        label="Mô tả chi tiết sản phẩm"
        required
        type="text-area"
      />
      <Category />
      <Upload name="thumbnail" label="Ảnh bìa" accept="image/*" />
      <Upload name="video" label="Video" accept="video/*" />
    </div>
  );
}

export default GeneralInformation;
