import type { FieldError, HtmlField as HTMLFieldType } from "@workspace/ui/types/wp";

interface Props {
  field: HTMLFieldType;
  fieldErrors: FieldError[];
  formId: string;
}

import React from "react";

export default function HTMLField({ field, fieldErrors, formId }: Props): React.ReactElement {
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
