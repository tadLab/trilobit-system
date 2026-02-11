export function SectionDivider() {
  return (
    <div className="py-8 flex justify-center">
      <svg
        className="w-16 h-8 text-blue-900/20"
        viewBox="0 0 64 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16 L16 8 L24 16 L32 8 L40 16 L48 8 L56 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="16" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
