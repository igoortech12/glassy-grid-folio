import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Pencil, Check, Share2, Sparkles } from "lucide-react";
import { initialWidgets, profileData, type Widget } from "@/lib/mock-data";
import { SortableCard } from "@/components/bento/sortable-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NoCode Folio — Bento link-in-bio" },
      {
        name: "description",
        content:
          "Crie um perfil link-in-bio modular em formato bento grid. Dark, glassmorphism, totalmente arrastável.",
      },
      { property: "og:title", content: "NoCode Folio" },
      {
        property: "og:description",
        content: "Link-in-bio em formato bento grid, dark mode imersivo.",
      },
    ],
  }),
  component: BentoPage,
});

function BentoPage() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWidgets((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDelete = (id: string) =>
    setWidgets((items) => items.filter((i) => i.id !== id));

  return (
    <main className="relative min-h-screen px-4 pb-32 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto w-full max-w-5xl">
        <Header />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
            <section className="bento-grid">
              {widgets.map((w, i) => (
                <SortableCard
                  key={w.id}
                  widget={w}
                  index={i}
                  isEditing={isEditing}
                  onDelete={handleDelete}
                />
              ))}
            </section>
          </SortableContext>
        </DndContext>

        <Footer />
      </div>

      <FloatingEditButton isEditing={isEditing} onToggle={() => setIsEditing((v) => !v)} />
    </main>
  );
}

function Header() {
  return (
    <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:mb-10">
      <div className="flex min-w-0 items-center gap-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary/20 ring-1 ring-primary/40">
          <Sparkles className="h-4 w-4 text-primary-glow" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            NoCode Folio
          </p>
          <p className="truncate text-sm font-semibold text-foreground">
            nocodefolio.app/{profileData.username}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur transition-colors hover:bg-white/10"
      >
        <Share2 className="h-3.5 w-3.5" />
        Compartilhar
      </button>
    </header>
  );
}

function Footer() {
  return (
    <p className="mt-12 text-center text-[11px] text-muted-foreground/70">
      Feito com <span className="text-primary-glow">●</span> no NoCode Folio · arraste, organize, brilhe.
    </p>
  );
}

function FloatingEditButton({
  isEditing,
  onToggle,
}: {
  isEditing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold backdrop-blur transition-all ${
        isEditing
          ? "bg-emerald-500 text-emerald-950 shadow-[0_10px_40px_-10px_oklch(0.7_0.18_160)]"
          : "bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] animate-glow-pulse"
      }`}
    >
      {isEditing ? (
        <>
          <Check className="h-4 w-4" /> Concluir
        </>
      ) : (
        <>
          <Pencil className="h-4 w-4" /> Editar perfil
        </>
      )}
    </button>
  );
}
