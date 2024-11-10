import { useParams } from "react-router-dom";
import AllOrder from "./AllOrder";
import PendingOrder from "./PendingOrder";
import DeliveringOrder from "./DeliveringOrder";
import DeliveredOrder from "./DeliveredOrder";
import ReceivedOrder from "./ReceivedOrder";
import CancelledOrder from "./CancelledOrder";
import RefundedOrder from "./RefundedOrder";

const page = {
    all: AllOrder,
    pending: PendingOrder,
    delivering: DeliveringOrder,
    delivered: DeliveredOrder,
    received: ReceivedOrder,
    cancelled: CancelledOrder,
    refunded: RefundedOrder
}
function Orders() {
    const params = useParams();
    const Page = page[params.page] || AllOrder;
    return <Page></Page>;
}
export default Orders;
