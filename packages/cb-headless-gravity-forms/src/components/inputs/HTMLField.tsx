import type { FieldError, HtmlField as HTMLFieldType } from "@/types/wp.js";

interface Props {
  field: HTMLFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

export default function HTMLField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, content, cssClass, databaseId } = field;
  const htmlId = `field_${formId}_${databaseId}`;

  return (
    <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
      <div
        className={`font-sans`}
        dangerouslySetInnerHTML={{ __html: content ?? `` }}
      />
    </div>
  );
}
