import { persist } from "zustand/middleware";
import { create } from "zustand";

interface MetaDataType {
    "title": string,
    "content": string,
    "tag": string
}

type NoteDraftStore = {
    draft: MetaDataType;
    setDraft: (note: MetaDataType) => void;
    clearDraft: () => void;
};

const initialDraft: MetaDataType = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({ draft: note })),
            clearDraft: () => set(() => ({ draft: initialDraft })),
        }
        ),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        }
    )
)