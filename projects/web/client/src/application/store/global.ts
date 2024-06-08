import { create } from "zustand";
import {
  HomeItem,
  ListItem,
  NotificationItem,
  Settings,
  TodoListItem,
  homeItems,
  lists,
  notifications,
  settings,
} from "@/application/mock/test";

type StoreProps = {
  safeAreaTop: number;
  safeAreaBottom: number;
  menuOpen: boolean;
  notificationsOpen: boolean;
  currentPage: number | null;
  homeItems: HomeItem[];
  lists: TodoListItem[];
  notifications: NotificationItem[];
  settings: Settings;
  selectedList: TodoListItem | undefined;
  setGlobalStore: (data: Partial<StoreProps>) => void;
  setDone: (list: TodoListItem, listItem: ListItem, done: boolean) => void;
};

export const useGlobalStore = create<StoreProps>()((set) => ({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  homeItems,
  lists,
  notifications,
  settings,
  selectedList: undefined,

  setGlobalStore: (data: Partial<StoreProps>) => set((state) => ({ ...state, ...data })),
  setDone: (list: TodoListItem, listItem: ListItem, done: boolean) => {
    set((s) => {
      const listIndex = s.lists.findIndex((l) => l === list);
      const items = s.lists[listIndex].items;
      const itemIndex = items?.findIndex((i) => i === listItem);
      const item = items?.[itemIndex ?? -1];
      if (!item) return s;
      item.done = done;
      if (list === s.selectedList) {
        s.selectedList = s.lists[listIndex];
      }
      return s;
    });
  },
}));
