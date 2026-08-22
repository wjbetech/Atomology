/**
 * End-of-run screen. The congratulations treatment and stats land with
 * the win-states/results tickets; this shell keeps the route real.
 */
export default function ResultsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold">Results</h1>
      <p className="opacity-80 max-w-md text-sm">
        Finish a session to see your score, accuracy, and personal bests here.
      </p>
    </div>
  );
}
