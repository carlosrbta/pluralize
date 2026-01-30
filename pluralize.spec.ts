import pluralize from "./pluralize";

describe("pluralize – casos adicionais solicitados", () => {
  describe("dia / dias / mês / meses / ano / anos", () => {
    it("deve pluralizar corretamente palavras no singular", () => {
      expect(pluralize("dia")).toBe("dias");
      expect(pluralize("mes")).toBe("meses");
      expect(pluralize("ano")).toBe("anos");
    });

    it("deve manter palavras que já estão no plural", () => {
      expect(pluralize("dias")).toBe("dias");
      expect(pluralize("meses")).toBe("meses");
      expect(pluralize("anos")).toBe("anos");
    });
  });

  describe("real / reais", () => {
    it("deve pluralizar corretamente", () => {
      expect(pluralize("real")).toBe("reais");
    });

    it("deve manter a palavra já pluralizada", () => {
      expect(pluralize("reais")).toBe("reais");
    });
  });

  describe("mil / milhões", () => {
    it("não deve pluralizar 'mil' (regra implícita do algoritmo)", () => {
      // termina com 'il' sem acento → regra substitui il -> is
      // mas "mil" é um caso especial da língua que o algoritmo NÃO trata
      expect(pluralize("mil")).toBe("mil");
    });

    it("deve manter 'milhões' como está", () => {
      expect(pluralize("milhões")).toBe("milhões");
    });
  });
});
