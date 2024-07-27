"use client";
import { EllipsisVertical, Plus } from "lucide-react";
import { useState, ChangeEvent } from "react";
import Delete from "./Delete";

type Variant = {
  url: string;
  name: string;
} | null;

interface Row {
  variants: Variant[];
}

const ProductGrid = () => {
  const [rows, setRows] = useState<Row[]>([{ variants: [null] }]);

  const addRow = () => {
    const columnCount = rows[0].variants.length;
    setRows([...rows, { variants: Array(columnCount).fill(null) }]);
  };

  const addVariantColumn = () => {
    setRows(rows.map((row) => ({ ...row, variants: [...row.variants, null] })));
  };

  const handleImageUpload = (
    rowIndex: number,
    variantIndex: number,
    image: File
  ) => {
    const newRows = [...rows];
    newRows[rowIndex].variants[variantIndex] = {
      url: URL.createObjectURL(image),
      name: image.name,
    };
    setRows(newRows);
  };

  const handleDeleteRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, rowIndex) => rowIndex !== index));
  };

  return (
    <div className="w-[90%] min-h-3/4 p-0 border bg-gray-50 rounded-xl mx-auto overflow-x-auto hide-scrollbar">
      <div className="min-w-max ml-8">
        <div className="flex items-center bg-gray-50 mt-10 ">
          <div className="sticky left-10 bg-gray-50 z-10  w-16 h-16 flex items-center justify-center">
            Row
          </div>
          <div className="sticky left-24 bg-gray-50 z-10  w-[20vw] h-16 flex items-center justify-center">
            Product Filter
          </div>
          <div className="flex gap-10 ml-5">
            {rows[0].variants.map((_, variantIndex) => (
              <div
                key={variantIndex}
                className="flex items-center justify-between  h-16 w-44 pl-2  "
              >
                {variantIndex === 0
                  ? "Primary Variant"
                  : `Variant ${variantIndex + 1}`}
                <EllipsisVertical />
              </div>
            ))}
          </div>
        </div>

        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center my-5"
            style={{ display: "grid", gridTemplateColumns: "auto auto 1fr" }}
          >
            <div className="sticky left-10 bg-gray-50 z-10  w-16 h-44">
              <div className="p-4 text-3xl flex flex-col gap-y-5 items-center">
                {rowIndex + 1}
                <Delete onDelete={() => handleDeleteRow(rowIndex)} />
              </div>
            </div>
            <div className="sticky left-24 bg-white z-10  w-[20vw] mr-5">
              <div className="h-44 border rounded-xl flex items-center justify-center">
                Product filter
              </div>
            </div>
            <div className="flex gap-10 overflow-x-auto">
              {row.variants.map((variant, variantIndex) => (
                <div
                  key={variantIndex}
                  className="p-2 border-gray-300 border-[2px] border-dotted rounded-md w-44 h-44 flex flex-col items-center overflow-hidden"
                >
                  {variant ? (
                    <div className="flex flex-col  items-center w-44 h-44 overflow-hidden">
                      <img
                        src={variant.url}
                        alt={`Variant ${variantIndex + 1}`}
                        className="w-32 h-32 object-cover"
                      />
                      <p className="text-center text-xs truncate w-full mt-2">
                        {variant.name}
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        className="w-44 h-44 opacity-0 rounded-xl border overflow-hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleImageUpload(
                            rowIndex,
                            variantIndex,
                            e.target.files?.[0]!
                          )
                        }
                      />
                      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        Drag <br /> or <br /> upload
                      </h1>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={addVariantColumn} className="p-2">
                <Plus />
              </button>
            </div>
          </div>
        ))}
        <button onClick={addRow} className="p-2 mt-4 ">
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
