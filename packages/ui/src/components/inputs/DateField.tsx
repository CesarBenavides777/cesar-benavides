import { gql } from "@apollo/client";

import type {
  DateField as DateFieldType,
  FieldError,
} from "@workspace/ui/types/wp";
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "@workspace/ui/hooks/useGravityForm";
import { Label } from "@workspace/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { format, isValid, parse } from "date-fns";
import { Calendar } from "@workspace/ui/components/calendar";
import { useId, useState, type JSX } from "react";
// import { SelectSingleEventHandler } from "react-day-picker";
import { Input } from "@workspace/ui/components/input";

export const DATE_FIELD_FIELDS = gql`
  fragment DateFieldFields on DateField {
    id
    databaseId
    label
    description
    cssClass
    isRequired
    placeholder
  }
`;

interface Props {
  field: DateFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

const DEFAULT_VALUE = "";

export default function DateField({
  field,
  fieldErrors,
  formId,
}: Props): JSX.Element {
  const {
    id,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
    databaseId,
  } = field;
  const htmlId = `field_${formId}_${databaseId}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === databaseId,
  ) as StringFieldValue | undefined;
  const inputId = useId();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "MM/dd/yyyy"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
      dispatch({
        type: ACTION_TYPES.updateDateFieldValue,
        fieldValue: {
          id,
          value: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        },
      });
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 gfield gfield-${type} ${cssClass}`.trim()}
    >
      {label && (
        <Label htmlFor={htmlId}>
          {isRequired ? (
            <>
              {label}
              <sup className={`text-secondary`}>*</sup>
            </>
          ) : (
            label
          )}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            <Input
              type="text"
              name={String(databaseId)}
              id={htmlId}
              className={`form-input[type='date'] border-none bg-transparent p-0`}
              required={Boolean(isRequired)}
              placeholder={
                selectedDate
                  ? format(selectedDate, "MM-dd-yyyy")
                  : "Pick a date"
              }
              value={inputValue}
              onChange={handleInputChange}
            />
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[background]" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            onMonthChange={setMonth}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description ? (
        <p className="field-description font-body text-sm italic">
          {description}
        </p>
      ) : null}
      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
