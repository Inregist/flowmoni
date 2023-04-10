import { BaseInputProps } from '.';

export const BaseFieldInput = (props: BaseInputProps) => {
  const { icon, children } = props;

  return (
    <div className="flex items-center bg-white py-3 pl-4">
      <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
      <div className="ml-4 h-8 grow">{children}</div>
    </div>
  );
};
