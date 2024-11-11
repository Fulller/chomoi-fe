import { ProductProvider } from "./.state/useProduct";
import GeneralInformation from "./GeneralInformation";
import DefailInformation from "./DefailInformation";
import SellingInformation from "./SellingInformation";
import SubmitButton from "./SubmitButton";
import ".scss";

function ShopProduct() {
  return (
    <ProductProvider>
      <div id="shop-product-page">
        <GeneralInformation />
        <DefailInformation />
        <SellingInformation />
        <DefailInformation />
        <SubmitButton />
      </div>
    </ProductProvider>
  );
}

export default ShopProduct;
