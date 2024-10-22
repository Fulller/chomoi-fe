import AddressService from "@services/address.service";
import { useEffect, useState } from "react";
function Address() {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetchAddress();
    }, [])
    async function fetchAddress() {
        const [data, error] = await AddressService.getAll();
        if (error) {
            console.log({ error });
            return;
        }
        console.log({ data })
        setAddresses(data)
    }
    console.log({ addresses });
    return (
        <div>
            {addresses.map((address) => {
                const { id, detail, district, isDefault, province, receiverName, receiverPhone, ward } = address;
                return <div key={id}>
                    <div>
                        <span>{receiverName}</span>
                        <span>{receiverPhone}</span>
                    </div>
                    <div>
                        {`${detail}, ${ward}, ${district}, ${province}`}
                    </div>
                    {isDefault && <span>Mặc định</span>}
                    <div></div>
                </div>
            })}
        </div>
    );
}
export default Address;