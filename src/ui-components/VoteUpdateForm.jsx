/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { Vote } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function VoteUpdateForm(props) {
  const {
    id: idProp,
    vote: voteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    voterId: "",
    choice: "",
    questionId: "",
    country: "",
  };
  const [voterId, setVoterId] = React.useState(initialValues.voterId);
  const [choice, setChoice] = React.useState(initialValues.choice);
  const [questionId, setQuestionId] = React.useState(initialValues.questionId);
  const [country, setCountry] = React.useState(initialValues.country);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = voteRecord
      ? { ...initialValues, ...voteRecord }
      : initialValues;
    setVoterId(cleanValues.voterId);
    setChoice(cleanValues.choice);
    setQuestionId(cleanValues.questionId);
    setCountry(cleanValues.country);
    setErrors({});
  };
  const [voteRecord, setVoteRecord] = React.useState(voteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Vote, idProp)
        : voteModelProp;
      setVoteRecord(record);
    };
    queryData();
  }, [idProp, voteModelProp]);
  React.useEffect(resetStateValues, [voteRecord]);
  const validations = {
    voterId: [],
    choice: [{ type: "Required" }],
    questionId: [],
    country: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          voterId,
          choice,
          questionId,
          country,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Vote.copyOf(voteRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "VoteUpdateForm")}
      {...rest}
    >
      <TextField
        label="Voter id"
        isRequired={false}
        isReadOnly={false}
        value={voterId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              voterId: value,
              choice,
              questionId,
              country,
            };
            const result = onChange(modelFields);
            value = result?.voterId ?? value;
          }
          if (errors.voterId?.hasError) {
            runValidationTasks("voterId", value);
          }
          setVoterId(value);
        }}
        onBlur={() => runValidationTasks("voterId", voterId)}
        errorMessage={errors.voterId?.errorMessage}
        hasError={errors.voterId?.hasError}
        {...getOverrideProps(overrides, "voterId")}
      ></TextField>
      <SelectField
        label="Choice"
        placeholder="Please select an option"
        isDisabled={false}
        value={choice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              voterId,
              choice: value,
              questionId,
              country,
            };
            const result = onChange(modelFields);
            value = result?.choice ?? value;
          }
          if (errors.choice?.hasError) {
            runValidationTasks("choice", value);
          }
          setChoice(value);
        }}
        onBlur={() => runValidationTasks("choice", choice)}
        errorMessage={errors.choice?.errorMessage}
        hasError={errors.choice?.hasError}
        {...getOverrideProps(overrides, "choice")}
      >
        <option
          children="Yes"
          value="YES"
          {...getOverrideProps(overrides, "choiceoption0")}
        ></option>
        <option
          children="No"
          value="NO"
          {...getOverrideProps(overrides, "choiceoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Question id"
        isRequired={false}
        isReadOnly={false}
        value={questionId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              voterId,
              choice,
              questionId: value,
              country,
            };
            const result = onChange(modelFields);
            value = result?.questionId ?? value;
          }
          if (errors.questionId?.hasError) {
            runValidationTasks("questionId", value);
          }
          setQuestionId(value);
        }}
        onBlur={() => runValidationTasks("questionId", questionId)}
        errorMessage={errors.questionId?.errorMessage}
        hasError={errors.questionId?.hasError}
        {...getOverrideProps(overrides, "questionId")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              voterId,
              choice,
              questionId,
              country: value,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || voteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || voteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
