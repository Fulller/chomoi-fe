import Variations from "./Variations";
import SKUs from "./SKUs";
import ".scss";

export default function VariationsAndSKUs() {
  return (
    <div className="variations-skus">
      <Variations></Variations>
      <SKUs></SKUs>
    </div>
  );
}
