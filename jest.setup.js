// jest.setup.js
import { jest } from "@jest/globals";
console.log("jest.setup.js est exécuté");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(), // Mock pour la fonction push
      replace: jest.fn(), // Mock pour la fonction replace
      // Ajoutez d'autres méthodes ici au besoin
    };
  },
  // Si vos composants utilisent également withRouter ou d'autres exportations de 'next/router', mockez-les ici
}));
