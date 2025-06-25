export interface ModuleReplacement {
  type: string;
  moduleName: string;
  replacement?: string;
  nodeVersion?: string;
  mdnPath?: string;
  docPath?: string;
  category: string;
}

export interface CacheData {
  data: ModuleReplacement[];
  etag?: string;
  lastModified?: string;
  timestamp: number;
}

export interface FilterState {
  search: string;
  category: string;
  type: string;
}
