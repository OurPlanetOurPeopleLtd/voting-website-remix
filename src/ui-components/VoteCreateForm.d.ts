/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VoteCreateFormInputValues = {
    voterId?: string;
    choice?: string;
    questionId?: string;
    country?: string;
};
export declare type VoteCreateFormValidationValues = {
    voterId?: ValidationFunction<string>;
    choice?: ValidationFunction<string>;
    questionId?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VoteCreateFormOverridesProps = {
    VoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    voterId?: PrimitiveOverrideProps<TextFieldProps>;
    choice?: PrimitiveOverrideProps<SelectFieldProps>;
    questionId?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VoteCreateFormProps = React.PropsWithChildren<{
    overrides?: VoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VoteCreateFormInputValues) => VoteCreateFormInputValues;
    onSuccess?: (fields: VoteCreateFormInputValues) => void;
    onError?: (fields: VoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VoteCreateFormInputValues) => VoteCreateFormInputValues;
    onValidate?: VoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function VoteCreateForm(props: VoteCreateFormProps): React.ReactElement;
