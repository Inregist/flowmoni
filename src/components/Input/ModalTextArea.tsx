import { CommonInputProps } from '.';
import dynamic from 'next/dynamic';

const BaseModalInput = dynamic(
  () => import('./BaseModalInput').then((c) => c.BaseModalInput),
  { ssr: false },
);

export const ModalTextArea = (props: CommonInputProps) => {
  return (
    <BaseModalInput {...props}>
      <div className="h-48 w-48 bg-gray-300"></div>
      {/* <textarea className="h-32 w-48" /> */}
    </BaseModalInput>
  );
};
