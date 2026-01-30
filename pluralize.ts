type Regras = {
  acrescentar: Record<string, string[]>;
  substituir: Record<string, string>;
  excecoes: Record<string, string>;
  sem_plural: string[];
};

const regras: Regras = {
  /**
   * Palavras que terminam em a|e|i|o|u|ã|ãe|ão
   * apenas acrescenta a letra 's' no final
   */
  acrescentar: {
    s: ["a", "e", "i", "o", "u", "ã", "ãe"],
    es: ["r", "z", "n", "ás"],
    "": ["is", "us", "os"],
  },

  /**
   * Palavras que terminam em al|el|ol|ul|il|m
   * substitui a terminação
   */
  substituir: {
    ais: "al",
    eis: "el",
    ois: "ol",
    uis: "ul",
    is: "il",
    ns: "m",
    eses: "ês",
    ões: "ão",
  },

  /**
   * Plural das sete exceções
   */
  excecoes: {
    males: "mal",
    cônsules: "cônsul",
    méis: "mel",
    fiéis: "fel",
    cais: "cal",
  },

  /**
   * Palavras que não tem plural
   */
  sem_plural: ["não"],
};

function _plural(palavra: string): string {
  const regex_troca = "^([a-zA-Zà-úÀ-Ú]*)(%s)$";
  let plural = "";

  for (const regraKey in regras) {
    const regra = regraKey as keyof Regras;

    switch (regra) {
      case "acrescentar": {
        for (const adicao in regras.acrescentar) {
          const busca = regex_troca.replace(
            "%s",
            regras.acrescentar[adicao].join("|"),
          );
          const regex = new RegExp(busca, "i");

          if (regex.exec(palavra) !== null) {
            plural = palavra + adicao;
            break;
          }
        }
        break;
      }

      case "substituir": {
        for (const substituicao in regras.substituir) {
          const busca = regex_troca.replace(
            "%s",
            regras.substituir[substituicao],
          );
          const regex = new RegExp(busca, "i");
          const match = regex.exec(palavra);

          if (match !== null) {
            /**
             * Se a palavra for paroxítona ou proparoxítona,
             * troca-se 'il' por 'eis'
             */
            if (palavra.match(/([áéíóú])/) !== null && match[2] === "il") {
              plural = palavra.replace("il", "eis");
              break;
            } else {
              const busca_sub = new RegExp(match[2] + "$", "i");
              plural = palavra.replace(busca_sub, substituicao);
              break;
            }
          }
        }
        break;
      }

      case "excecoes": {
        for (const excecao in regras.excecoes) {
          if (palavra === regras.excecoes[excecao]) {
            plural = excecao;
            break;
          }
        }
        break;
      }

      case "sem_plural": {
        regras.sem_plural.forEach((r) => {
          if (palavra === r) plural = palavra;
        });
        break;
      }
    }
  }

  return plural !== "" ? plural : palavra;
}

export function pluralize(palavras: string): string {
  const palavrasPlural = palavras.split(" ");

  palavrasPlural.forEach((palavra, i) => {
    palavrasPlural[i] = _plural(palavra);
  });

  return palavrasPlural.join(" ");
}
