// Import everything needed to use the `useQuery` hook
import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { FC, ReactElement } from "react";

type GetLocationsQuery = {
    locations: {
        id: string;
        name: string;
        description: string;
        photo: string;
    }[];
};

type GetLocationsQueryVariables = Record<string, never>;

const GET_LOCATIONS: TypedDocumentNode<GetLocationsQuery, GetLocationsQueryVariables> = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`;

const DisplayLocations: FC = () => {
    const { loading, error, data } = useQuery<GetLocationsQuery, GetLocationsQueryVariables>(
        GET_LOCATIONS,
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No data found</p>;

    return data.locations.map(({ id, name, description, photo }) => (
        <div key={id}>
            <h3>{name}</h3>
            <img width="400" height="250" alt="location-reference" src={`${photo}`} />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
            <br />
        </div>
    ));
};

export const App: FC = (): ReactElement => {
    return (
        <div>
            <h2>My first Apollo app 🚀</h2>
            <DisplayLocations />
        </div>
    );
};
