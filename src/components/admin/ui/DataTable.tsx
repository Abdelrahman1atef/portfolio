"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id?: string; _id?: string }>({ 
  columns, 
  data, 
  onEdit, 
  onDelete,
  isLoading 
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-900 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50">
            {columns.map((col, i) => (
              <th key={i} className={cn("p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800", col.className)}>
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="p-10 text-center text-slate-500">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr key={item._id || item.id || i} className="group hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                {columns.map((col, j) => (
                  <td key={j} className={cn("p-4 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/50", col.className)}>
                    {typeof col.accessor === "function" 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="p-4 text-sm border-b border-slate-100 dark:border-slate-800/50 text-right">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(item)}
                          className="p-2 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
