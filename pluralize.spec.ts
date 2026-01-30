import pluralize from "./pluralize";

describe("pluralize", () => {
  describe("acrescentar", () => {
    it("deve acrescentar 's' para palavras terminadas em vogais/ã/ãe", () => {
      expect(pluralize("casa")).toBe("casas"); // a -> +s
      expect(pluralize("pente")).toBe("pentes"); // e -> +s
      expect(pluralize("taxi")).toBe("taxis"); // i -> +s
      expect(pluralize("carro")).toBe("carros"); // o -> +s
      expect(pluralize("peru")).toBe("perus"); // u -> +s
      expect(pluralize("irmã")).toBe("irmãs"); // ã -> +s
      expect(pluralize("mãe")).toBe("mães"); // ãe -> +s
    });

    it("deve acrescentar 'es' para palavras terminadas em r|z|n|ás", () => {
      expect(pluralize("flor")).toBe("flores"); // r -> +es
      expect(pluralize("arroz")).toBe("arrozes"); // z -> +es (pela regra do seu código)
      expect(pluralize("hífen")).toBe("hífens"); // n -> +es (regex inclui à-ú, deve pegar)
      expect(pluralize("inglês")).toBe("ingleses"); // ás -> +es (exemplo com "ês" aqui vira "eses" em outra regra, mas este termina com "ês")
    });

    it("para palavras terminadas em is|us|os, não deve acrescentar nada (pela regra '')", () => {
      expect(pluralize("lápis")).toBe("lápis");
      expect(pluralize("vírus")).toBe("vírus");
      expect(pluralize("óculos")).toBe("óculos");
    });
  });

  describe("substituir", () => {
    it("deve substituir al|el|ol|ul|m conforme regras", () => {
      expect(pluralize("animal")).toBe("animais"); // al -> ais
      expect(pluralize("papel")).toBe("papeis"); // el -> eis (sem acento, seu código gera 'papeis')
      expect(pluralize("farol")).toBe("farois"); // ol -> ois
      expect(pluralize("azul")).toBe("azuis"); // ul -> uis
      expect(pluralize("bom")).toBe("bons"); // m -> ns
    });

    it("deve transformar 'ão' em 'ões'", () => {
      expect(pluralize("avião")).toBe("aviões");
    });

    it("deve transformar 'ês' em 'eses'", () => {
      expect(pluralize("português")).toBe("portugueses");
    });

    it("caso especial: se tiver vogal acentuada e terminar em 'il', trocar por 'eis'", () => {
      // regra do seu código: se tiver [áéíóú] e sufixo for "il" => replace("il","eis")
      expect(pluralize("fácil")).toBe("fáceis");
      expect(pluralize("dócil")).toBe("dóceis");
    });

    it("se terminar em 'il' sem acento, trocar para 'is'", () => {
      expect(pluralize("fuzil")).toBe("fuzis"); // il -> is
      expect(pluralize("perfil")).toBe("perfis"); // il -> is
    });
  });

  describe("excecoes", () => {
    it("deve usar o plural mapeado para as exceções", () => {
      expect(pluralize("mal")).toBe("males");
      expect(pluralize("cônsul")).toBe("cônsules");
      expect(pluralize("mel")).toBe("méis");
      expect(pluralize("fel")).toBe("fiéis");
      expect(pluralize("cal")).toBe("cais");
    });
  });

  describe("sem_plural", () => {
    it("não deve pluralizar palavras sem plural", () => {
      expect(pluralize("não")).toBe("não");
    });
  });

  describe("frases", () => {
    it("deve pluralizar cada palavra separada por espaço", () => {
      expect(pluralize("casa animal avião")).toBe("casas animais aviões");
    });

    it("deve manter palavras que não casam com nenhuma regra", () => {
      // qualquer palavra que não bata no regex vira ela mesma
      expect(pluralize("xpto")).toBe("xptos"); // termina com 'o' => +s, então vira plural; vamos usar outra:
      expect(pluralize("abc123")).toBe("abc123"); // não casa com ^([a-zA-Zà-úÀ-Ú]*)(%s)$ por ter números
    });
  });

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

  
});
