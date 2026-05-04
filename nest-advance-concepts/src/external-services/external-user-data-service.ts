export const EXTERNAL_USER_DATA_SERVICE = 'EXTERNAL_USER_DATA_SERVICE';

export class ExternalUserDataService {
    async fetchUsers(): Promise<
        {
            email: string;
            name: string;
            createdAt: Date;
            id: number;
        }[]
    > {
        // Simulating an HTTP call to an external service
        return Promise.resolve([
            {
                id: 1001,
                name: 'External User',
                email: 'externaluser@email.com',
                createdAt: new Date(),
            },
        ]);
    }
}
