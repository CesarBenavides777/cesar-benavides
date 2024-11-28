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
        className={`text-md block px-2 py-8 text-left font-body leading-5 text-gray-800`}
        dangerouslySetInnerHTML={{ __html: content ?? `` }}
      />
    </div>
  );
}
