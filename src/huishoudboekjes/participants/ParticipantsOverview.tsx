import { useNotifier } from "../../contexts/NotificationContext";
import { AddParticipantModal } from "./_components/AddParticipantModal";
import { ParticipantsTable } from "./_components/ParticipantsTable";
import { useParticipantsOverview } from "./_hooks/useParticipantsOverview";

interface ParticipantsOverviewParameters {
  huishoudboekjeId: string;
  participants: string[];
}

const ParticipantsOverview: React.FC<ParticipantsOverviewParameters> = ({
  huishoudboekjeId,
  participants,
}) => {
  const { notify } = useNotifier();
  const {
    open,
    email,
    error,
    loading,
    openModal,
    closeModal,
    setEmail,
    addParticipant,
  } = useParticipantsOverview(huishoudboekjeId);

  const handleAdd = async () => {
    const success = await addParticipant();
    if (success) notify("Lid succesvol toegevoegd!");
  };

  return (
    <>
      <ParticipantsTable participants={participants} onAddClick={openModal} />
      <AddParticipantModal
        open={open}
        email={email}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onClose={closeModal}
        onSubmit={handleAdd}
      />
    </>
  );
};

export default ParticipantsOverview;
