const CloseModal = ({ confirm, togle }) => {
  return (
    <div>
      <p>text</p>
      <button
        onClick={() => {
          confirm(true);
          togle(false);
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          confirm(false);
          togle(false);
        }}
      >
        No
      </button>
    </div>
  );
};

export default CloseModal;
