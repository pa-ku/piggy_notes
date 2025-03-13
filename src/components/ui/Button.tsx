export default function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <>
      <button
      {...props}
        className='p-1.5 hover:bg-gray-200 dark:hover:bg-primary-light rounded-lg transition-colors'
      >
        {children}
      </button>
    </>
  );
}
