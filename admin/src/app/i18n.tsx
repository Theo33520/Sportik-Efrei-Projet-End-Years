
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    fr: {
        translation: {
            login: {
                title: "Connectez-vous",
                emailPlaceholder: "Email",
                passwordPlaceholder: "Mot de passe",
                loginButton: "Connexion",
                forgotPassword: "Mot de passe oublié?",
                createAccount: "Crée un compte",
                success: "Connexion réussie",
                failure: "Échec de connexion",
                networkError: "Erreur réseau",
            },
            intro: {
                title: "Sportik une expérience sportive combinant expertise et technologie",
            },
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr', // langue par défaut
        interpolation: {
            escapeValue: false, // pas nécessaire pour React
        },
    });

export default i18n;
