import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { Widget } from "@/lib/mock-data";
import { WidgetContent } from "./widgets";

const SIZE_CLASSES: Record<Widget["size"], string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

interface Props {
  widget: Widget;
  index: number;
  isEditing: boolean;
  onDelete: (id: string) => void;
}

export function SortableCard({ widget, index, isEditing, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 60}ms`,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${SIZE_CLASSES[widget.size]} animate-bento-rise ${
        isDragging ? "opacity-70" : ""
      }`}
    >
      <div
        className={`group bento-card ${isEditing ? "animate-wiggle" : "bento-card-hover"} h-full w-full`}
      >
        <WidgetContent widget={widget} />

        {isEditing && (
          <>
            <button
              type="button"
              {...attributes}
              {...listeners}
              aria-label="Arrastar"
              className="absolute left-2 top-2 z-10 grid h-8 w-8 cursor-grab place-items-center rounded-full bg-slate-950/80 text-muted-foreground ring-1 ring-hairline backdrop-blur active:cursor-grabbing hover:text-primary-glow"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(widget.id);
              }}
              aria-label="Excluir"
              className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-destructive/90 text-destructive-foreground ring-1 ring-red-300/30 backdrop-blur hover:bg-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
