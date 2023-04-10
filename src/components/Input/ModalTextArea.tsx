import { BaseModalInput, ModalInputProps } from '.';

export const ModalTextArea = (props: ModalInputProps) => {
  const { onChange } = props;

  return (
    <BaseModalInput {...props}>
      <textarea className="h-32 w-full p-2" placeholder="type here..." />
      <button
        onClick={(e) => {
          onChange(5);
        }}
      >
        change
      </button>
    </BaseModalInput>
  );
};
