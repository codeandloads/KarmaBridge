declare module "karmabridge-types" {
    interface CATEGORY {
        id: string;
        title: string;
        jobs: [JOB] | null;
    }
    interface LOCATION {
        id: number;
        state: string;
        city: string;
        suburb: string;
        street: string;
        country: string;
        PostCode: string;
    }
    interface AUTHOR {
        id: string;
        firstName: string;
        lastName: string;
        imageUrl?: string;
    }
    interface JOB {
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
    interface JOBS_RESPONSE {
        jobs: JOB[];
        totalRows: number;
    }
    interface UserInfo {
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
