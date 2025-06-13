import React from "react";
import { useNavigate } from "react-router";
import { useNotifier } from "../contexts/NotificationContext";
import { useAddHuishoudboekje } from "./_hooks/useHuishoudboekjeAdd";
import { HuishoudboekjeForm } from "./_components/HuishoudboekjeForm";

const AddHuishoudboekjePage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotifier();
  const { addBoekje, loading, error } = useAddHuishoudboekje();

  const handleAdd = async (data: { naam: string; omschrijving: string }) => {
    try {
      await addBoekje(data);
      notify("Huishoudboekje toegevoegd");
      navigate("/huishoudboekjes");
    } catch (err) {
      console.error(err);
    }
  };

  return <HuishoudboekjeForm onSubmit={handleAdd} />;
};

export default AddHuishoudboekjePage;
