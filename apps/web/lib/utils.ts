import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flatListToHierarchical(
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {},
) {
  const tree = [] as any[];
  const childrenOf = {};
  // biome-ignore lint/complexity/noForEach: <explanation>
  data.forEach((item) => {
    // biome-ignore lint/style/noVar: <explanation>
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    var _a;
    const newItem = Object.assign({}, item);
    const id = newItem === null || newItem === void 0 ? void 0 : newItem[idKey];
    const parentId =
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (_a =
        newItem === null || newItem === void 0
          ? void 0
          : newItem[parentKey]) !== null && _a !== void 0
        ? _a
        : 0;
    if (!id) {
      return;
    }
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
}
