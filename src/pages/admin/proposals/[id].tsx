import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AdminLayout from "layouts/admin";

// import ProposalDetails from "components/ProposalDetails"; // Import ProposalDetails component
const ProposalDetails = dynamic(() => import("components/ProposalDetails"));

const ProposalPage = ({ ...rest }) => {
  const router = useRouter();
  const { id } = router.query; // id from URL

  return (
    <AdminLayout id={id}>
      <ProposalDetails id={id} />
    </AdminLayout>
  );
};

export default ProposalPage;
