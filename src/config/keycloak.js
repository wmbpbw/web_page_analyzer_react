import Keycloak from 'keycloak-js';

// Keycloak initialization options
const keycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL || 'http://host.docker.internal:8080',
    realm: process.env.REACT_APP_KEYCLOAK_REALM || 'web-analyzer',
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || 'web-analyzer-frontend'
};

// Initialize Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;