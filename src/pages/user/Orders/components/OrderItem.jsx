import { Link } from "react-router-dom";

function OrderItem({ orderItem }) {
    const { product, quantity, sku } = orderItem;
    const { name: productName, variations, isSimple, slug } = product;
    const { variation, price, image } = sku;

    const variationIds = variation.split(" ");
    const variationValues = variationIds.map((id) => {
        for (const variation of variations) {
            const foundOption = variation.options.find((option) => option.id === id);
            if (foundOption) return `${variation.name}: ${foundOption.value}`;
        }
        return "";
    }).filter(Boolean).join(", ");
    return (
        <div className="flex flex-row justify-between p-2 border-t">
            <div className="border p-1">
                <img className="w-20 h-20" src={image} />
            </div>
            <div className="flex-1 ml-4">
                <div >
                    <Link to={`/product/${slug}`} className="hover:text-primary">
                        <p className="text-sm">{productName}</p>
                    </Link>
                    {!isSimple && <p className="opacity-50">Phân loại hàng: {variationValues}</p>}
                    <p className="mt-3">x{quantity}</p>
                </div>
            </div>
            <div className="w-28 flex items-center">
                <p className="mx-auto text-primary">{price.toLocaleString('vi-VN')}đ</p>
            </div>
        </div>
    );
}

export default OrderItem;