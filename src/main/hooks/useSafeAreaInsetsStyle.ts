import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";

export type ExtendedEdge = Edge | "start" | "end";

const edgeInsetMap: Record<string, Edge> = {
  start: "left",
  end: "right",
};

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
};

export type SafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends ExtendedEdge[] = ExtendedEdge[]
> = {
  [K in Edges[number] as `${Property}${Capitalize<K>}`]: number;
};

export function useSafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends ExtendedEdge[] = []
>(
  safeAreaEdges: Edges = [] as unknown as Edges,
  property: Property = "padding" as Property
): SafeAreaInsetsStyle<Property, Edges> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {}) as SafeAreaInsetsStyle<Property, Edges>;
}
