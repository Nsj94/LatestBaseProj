import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  fr: {
    translation: {
      appbar: {
        settings: "Réglages",
        account: "Paramètres du compte",
        logout: "Se déconnecter",
      },
      auth: {
        error: {
          invalidCredentials: "Invalid Credentials",
        },
      },
      address: "Adresse",
      address2: "Adresse",
      postalCode: "Code postal",
      city: "Ville",
      Cancel: "Cancel",
      error: "Une erreur est survenue",
      user: {
        email: "Email",
        phone: "Téléphone",
        firstName: "Prénom",
        lastName: "Nom",
        company: "Société",
        password: "Mot de passe",
        passwordConfirm: "Répétez le mot de passe",
        cgu: "J'accepte les <cguLink>conditions générales d'utilisation</cguLink> et la <policy>politique de confidentialité</policy>.",
      },
      field: {
        required: "Ce champs est requis",
        badEmail: "Cet email n'est pas valide",
        password: {
          unmatched: "Les mots de passe ne correspondent pas.",
          required: "Renseignez un mot de passe",
        },
      },
      login: {
        title: "Login",
        connect: "Se connecter",
        username: {
          label: "Email",
          required: "Merci de renseigner votre email",
        },
        password: {
          label: "Mot de passe",
          forgotten: "Mot de passe oublié ?",
          required: "Merci de renseigner votre mot de passe",
        },
        register: "S'inscrire",
        noAccount: "Pas encore de compte ?",
      },
      signup: {
        title: "Créer un compte",
        fillAll: "Veuillez remplir tous les champs pour continuer",
        background_alt: "Un plaquiste faisant des mesures.",
        steps: {
          select: "Sélection offre",
          info: "Informations compte",
          pay: "Paiement",
        },
        subscription: {
          monthly: {
            title: "Abonnement mensuel",
            price: "<span>{{cost}} €</span> HT / mois",
            economy: "<b>Economisez {{total}} € !</b> <a>Payez à l'année</a>",
          },
        },
        payment: {
          title: "Bienvenue sur Nevoo {{value}} !",
          subtitle:
            "<b>Ajoutez vos informations de paiement</b> pour démarrer votre gestion avec Nevoo.",
        },
        billing: {
          title: "Adresse de facturation",
        },
        card: {
          title: "Paiement carte bancaire",
        },
      },
      card: {
        name: "Nom du détenteur de la carte",
        number: "Informations de la carte",
        security: "COde de sécurité",
      },
      payment: {
        summary: {
          title: "Récapitulatif de paiement",
          monthly: "Abonnement mensuel <price>{{price}} € HT</price>",
          total: "Total <price>{{price}} € TTC</price>",
        },
        validate: "Valider le paiement",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",
    debug: true,

    //keySeparator: true, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
