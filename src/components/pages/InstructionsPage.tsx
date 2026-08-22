/**
 * How-to-play guide. Content lands with the Instructions page ticket;
 * this shell keeps the route navigable meanwhile.
 */
export default function InstructionsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold">How to play</h1>
      <p className="opacity-80 max-w-md">
        Pick a mode on the Configure page, set your session length, and learn
        the periodic table one element at a time.
      </p>
      <p className="text-sm opacity-60">
        The full illustrated guide is on its way.
      </p>
    </div>
  );
}
