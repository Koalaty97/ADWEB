import { useParams, useNavigate } from "react-router";
import { useNotifier } from "../contexts/NotificationContext";
import { HuishoudboekjeForm } from "./_components/HuishoudboekjeForm";
import { useHuishoudboekjeEdit } from "./_hooks/useHuishoudboekjeEdit";

const EditHuishoudboekjePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notify } = useNotifier();
  const { boekje, loading, updateBoekje } = useHuishoudboekjeEdit(id!);

  if (!id) {
    return <p>Id ontbreekt</p>;
  }

  const handleUpdate = async (data: { naam: string; omschrijving: string }) => {
    try {
      await updateBoekje(data);
      notify("Huishoudboekje aangepast");
      navigate("/huishoudboekjes");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !boekje) {
    return <p>Loading...</p>;
  }

  return <HuishoudboekjeForm initial={boekje} onSubmit={handleUpdate} />;
};

export default EditHuishoudboekjePage;
