import { ControllerRenderProps, UseFormRegisterReturn } from 'react-hook-form';
import { Text } from './Text';
import { PropsWithChildren } from 'react';
import { ModalTextArea } from './ModalTextArea';
import dynamic from 'next/dynamic';

export const BaseModalInput = dynamic(
  () => import('./BaseModalInput').then((c) => c._BaseModalInput),
  { ssr: false },
);

export type BaseInputProps = PropsWithChildren & {
  icon?: React.ReactNode;
  placeholder?: string;
};

export type CommonInputProps = BaseInputProps & {
  registerField: UseFormRegisterReturn<string>;
};

export type ModalInputProps = BaseInputProps & ControllerRenderProps;

export const Input = {
  InputText: Text,
};

export const ModalInput = {
  ModalInputText: ModalTextArea,
};
