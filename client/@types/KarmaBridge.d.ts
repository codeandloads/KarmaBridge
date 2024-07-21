declare module "karmabridge-types" {
  export interface CATEGORY {
    id: string;
    title: string;
    jobs: [JOB] | null;
  }

  export interface JOB {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    categoryId: number;
    category: CATEGORY;
    type: string;
  }
}
