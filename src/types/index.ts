export interface Resource {
  id: string;
  name: string;
  icon?: string;
}

export interface ResourceData {
  resources: Resource[];
}

export interface ResourceCounts {
  [resourceId: string]: number;
}

export interface AppState {
  resources: Resource[];
  counts: ResourceCounts;
}
