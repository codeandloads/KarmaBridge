declare module "karmabridge-types" {
  export interface CATEGORY {
    id: string;
    title: string;
    jobs: [JOB] | null;
  }

  export interface LOCATION {
    id: number;
    state: string;
    city: string;
    suburb: string;
    street: string;
    country: string;
    PostCode: string;
  }

  export interface AUTHOR {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
  }

  export enum TYPES {
    "FullTime" = 1,
    "PartTime" = 2,
    "Casual" = 3,
    "Contract" = 4,
    "SubContract" = 5,
  }

  export interface JOB {
    refId: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    categoryId: number;
    category: CATEGORY;
    locations: LOCATION[];
    author: AUTHOR;
    type: TYPES;
    createdAt: Date;
  }

  export interface JOBS_RESPONSE {
    jobs: JOB[];
    totalRows: number;
  }

  export interface UserInfo {
    imageUrl?: string;
    FirstName: string;
    LastName: string;
    Email: string;
  }

  interface AuthInfo {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}
