export default function AddCounter({ setcounterNum }) {
  return (
    <button
      onClick={() => {
        setcounterNum((preState) => preState + 1);
      }}
    >
      AddCounter
    </button>
  );
}
