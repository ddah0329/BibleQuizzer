export default function ProgressBar({ current, total }) {
  const percent = Math.floor((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-blue-400 h-4 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
