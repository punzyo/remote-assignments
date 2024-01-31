export default function TopCounter({ setAllPlusOne }) {
  return (
    <button
      onClick={() => {
        setAllPlusOne(true);
      }}
    >
      All + 1
    </button>
  );
}
