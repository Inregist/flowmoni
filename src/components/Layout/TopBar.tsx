export const TopBar = () => {
  return (
    <div className="flex items-center justify-center rounded-t-md bg-slate-200 py-2 p-4">
      <div className="flex w-full items-center justify-between">
        <div className="text-lg font-medium">PageName</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50">
          <img
            src={'/icon-512x512.png'}
            alt="logo"
            className="h-6 w-6 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
