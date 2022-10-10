import TrainingForm from 'components/Training/TrainingForm';

const MobileForm = ({
  date_start,
  date_finish,
  setDate_start,
  setDate_finish,
  isInTable,
}) => {
  return (
    <>
      <TrainingForm
        date_start={date_start}
        date_finish={date_finish}
        setDate_start={setDate_start}
        setDate_finish={setDate_finish}
        isInTable={isInTable}
      />
    </>
  );
};

export default MobileForm;
