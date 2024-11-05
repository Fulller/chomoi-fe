import React, { useEffect, memo } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import VariationsAndSKUs from "./VariationsAndSKUs";
import Simple from "./Simple";
import { useSelector, useDispatch } from "react-redux";
import createProductSlice from "@redux/slices/product.create.slice";
import createProductSelecetor from "@redux/selector/product.create.selector";
import ".scss";

function Selling() {
  const { isSimple, variations } = useSelector(
    createProductSelecetor.getFields(["isSimple", "variations"])
  );
  const skusError = useSelector(
    createProductSelecetor.getErrorFields(["skus"])
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSimple && variations.length > 0) {
      handleChangeMode(true);
    }
    if (!isSimple && variations.length <= 0) {
      handleChangeMode(false);
    }
  }, [variations.length]);

  const handleChangeMode = (isSimpleValue) => {
    dispatch(createProductSlice.actions.changeMode(!isSimpleValue));
  };

  function handleAddVariation() {
    dispatch(createProductSlice.actions.addVariation());
  }

  return (
    <div id="selling-info">
      {isSimple && (
        <button className="add-variation" onClick={handleAddVariation}>
          <IoIosAddCircleOutline size={20} /> Thêm phân loại
        </button>
      )}
      {isSimple ? <Simple /> : <VariationsAndSKUs />}
      {skusError.skus && (
        <p className="error-validate-message">{skusError.skus}</p>
      )}
    </div>
  );
}

export default memo(Selling);
