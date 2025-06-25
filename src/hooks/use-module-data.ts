import { useEffect, useState } from "preact/hooks";
import type { ModuleReplacement } from "../types";

const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/es-tooling/module-replacements/main/manifests";
const FILES = ["micro-utilities.json", "native.json", "preferred.json"];

export const useModuleData = () => {
  const [replacements, setReplacements] = useState<ModuleReplacement[]>([]);

  const loadData = async () => {
    try {
      const responses = await Promise.all(
        FILES.map((file) => fetch(`${GITHUB_BASE_URL}/${file}`)),
      );

      const manifests = await Promise.all(responses.map((res) => res.json()));

      const allReplacements = manifests.flatMap((m) => m.moduleReplacements);
      setReplacements(allReplacements);
    } catch {}
  };

  useEffect(() => {
    loadData();
  }, []);

  return { replacements, refetch: loadData };
};
