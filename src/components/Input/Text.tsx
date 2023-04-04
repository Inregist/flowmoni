import { CommonInputProps } from '.';
import { BaseFieldInput } from './BaseFieldInput';

export const Text = (props: CommonInputProps) => {
  const { registerField, placeholder } = props;

  return (
    <BaseFieldInput {...props}>
      <input
        className="h-8 w-full border-b border-gray-300 bg-inherit text-lg"
        placeholder={placeholder ?? registerField.name}
        {...registerField}
      />
    </BaseFieldInput>
  );
};
