"use client";

import Image from "next/image";
import { useState } from "react";

export interface DataField {
  label: string;
  value?: string;
  key?: string;
  editable?: boolean;
}
interface DataSectionProps {
  title: string;
  fields: DataField[];
  onSave?: (fields: DataField[]) => void;
  gridColsClass?: string;
}

export function DataSection({
  title,
  fields,
  onSave,
  gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: DataSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<DataField[]>([]);

  const handleEdit = () => {
    setEditedFields(
      fields.map((field) => ({
        ...field,
      })),
    );

    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFields([]);
  };

  const handleChange = (index: number, value: string) => {
    setEditedFields((current) =>
      current.map((field, fieldIndex) =>
        fieldIndex === index ? { ...field, value } : field,
      ),
    );
  };

  const handleSave = () => {
    onSave?.(editedFields);
    setIsEditing(false);
    setEditedFields([]);
  };

  const displayFields = isEditing ? editedFields : fields;

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/verified.svg"
            alt=""
            width={24}
            height={24}
          />

          <h2 className="text-base font-semibold text-cinza">{title}</h2>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            aria-label={`Editar ${title}`}
            className="cursor-pointer rounded-md p-1 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900">
            <Image
              src="/icons/edit.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md px-3 py-1.5 text-sm text-cinza-2 transition-colors hover:bg-gray-100">
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-primary px-3 py-1.5 text-sm text-white transition-opacity hover:opacity-90">
              Guardar
            </button>
          </div>
        )}
      </div>

      <div className={`grid gap-x-6 gap-y-4 ${gridColsClass}`}>
        {displayFields.map((field, index) => (
          <div
            key={`${field.label}-${index}`}
            className="flex flex-col gap-1">
            <span className="text-xs font-normal text-cinza-3">
              {field.label}
            </span>

            {isEditing && field.editable !== false ? (
              <input
                type="text"
                value={field.value ?? ""}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm font-semibold text-cinza outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            ) : (
              <span className="text-sm font-semibold leading-snug text-cinza">
                {field.value || "-"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
