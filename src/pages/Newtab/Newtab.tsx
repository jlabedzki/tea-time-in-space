export default function Newtab() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="icon-input">
        <input
          type="text"
          placeholder="Search Google or type a URL"
          className="input  w-full max-w-xs"
        />
      </div>
    </div>
  );
}
