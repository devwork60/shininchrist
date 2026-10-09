import type { FocusIconName } from "@/components/icons/FocusIcons";

export interface FocusItemData {
  id: string;
  icon: FocusIconName;
  title: string;
  description: string;
}

export interface FocusSectionData {
  heading: string;
  /** CSS colour / variable used for the heading, icons and titles */
  accent: string;
  /** How many items go in the left column (default: half, rounded up) */
  leftCount?: number;
  items: FocusItemData[];
}
