import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import CustomersPage from "../../_components/customer-table";

const CustomerPage = async ({params:{farmId}}:{params:{farmId:Id<"farm">}}) => {

  const customers = await fetchQuery(api.customers.getCustomers, {farmId});

  return <div>
    <CustomersPage customers={customers} farmId={farmId} />
  </div>;
};
export default CustomerPage;
