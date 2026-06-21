import avatar from "@/assets/avatar.jpg";
import showcase1 from "@/assets/showcase-1.jpg";

export type WidgetSize = "1x1" | "2x1" | "1x2" | "2x2";

export type WidgetType =
  | "profile"
  | "social"
  | "showcase"
  | "newsletter"
  | "map"
  | "link"
  | "spotify"
  | "stat";

export interface Widget {
  id: string;
  type: WidgetType;
  size: WidgetSize;
  content: Record<string, unknown>;
}

export const profileData = {
  name: "Lucas Ferreira",
  username: "lucasfer",
  bio: "NoCode Builder · construindo MVPs em dias, não meses. Apaixonado por automação, IA e produto.",
  avatar,
  skills: ["Bubble", "React", "Supabase", "n8n", "AI"],
  location: "São Paulo, BR",
};

export const initialWidgets: Widget[] = [
  {
    id: "w-profile",
    type: "profile",
    size: "2x2",
    content: {},
  },
  {
    id: "w-social-ig",
    type: "social",
    size: "1x1",
    content: { network: "instagram", url: "https://instagram.com", handle: "@lucasfer" },
  },
  {
    id: "w-social-li",
    type: "social",
    size: "1x1",
    content: { network: "linkedin", url: "https://linkedin.com", handle: "in/lucasfer" },
  },
  {
    id: "w-showcase",
    type: "showcase",
    size: "2x2",
    content: {
      title: "Dashboard NoCode Analytics",
      tag: "Estudo de caso",
      cover: showcase1,
      url: "#",
    },
  },
  {
    id: "w-social-gh",
    type: "social",
    size: "1x1",
    content: { network: "github", url: "https://github.com", handle: "@lucasfer" },
  },
  {
    id: "w-social-yt",
    type: "social",
    size: "1x1",
    content: { network: "youtube", url: "https://youtube.com", handle: "@lucasfer" },
  },
  {
    id: "w-stat",
    type: "stat",
    size: "1x1",
    content: { label: "Projetos enviados", value: "47", trend: "+12 este mês" },
  },
  {
    id: "w-map",
    type: "map",
    size: "1x1",
    content: { city: "São Paulo", country: "Brasil" },
  },
  {
    id: "w-newsletter",
    type: "newsletter",
    size: "2x1",
    content: {
      title: "Newsletter NoCode Weekly",
      subtitle: "Receba 1 case por semana. Sem spam.",
    },
  },
  {
    id: "w-spotify",
    type: "spotify",
    size: "2x1",
    content: {
      title: "Tocando agora",
      track: "Strobe",
      artist: "Deadmau5",
    },
  },
];
