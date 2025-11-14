"use client"

// import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";




type FormValues = {
    title: string;
    content: string;
    tag: string;
}


// const validationSchema = Yup.object({
//     title: Yup.string()
//         .min(3, "Title must be at least 3 characters")
//         .max(50, "Title is too long")
//         .required("Title is required"),
//     content: Yup.string().max(500),
//     tag: Yup.string()
//         .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//         .required("Please choose a tag"),
// });


export default function NoteForm() {

    const queryClient = useQueryClient()

    const { draft, setDraft, clearDraft } = useNoteDraftStore()

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["notes"] });

            clearDraft()
            router.push('/notes/filter/all');
        },
    })


    const handleSubmit = (formData: FormData) => {
        const values = Object.fromEntries(formData) as FormValues;
        console.log(values);

        mutate(values)
    };

    return (

        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup}>
                <label >Title
                    <input id="title" name="title" type="text"
                        className={css.input}
                        defaultValue={draft?.title} onChange={handleChange} />
                </label>
            </div>

            <div className={css.formGroup}>
                <label >Content
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                        defaultValue={draft?.content}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className={css.formGroup}>
                <label >Tag
                    <select id="tag" name="tag"
                        className={css.select}
                        defaultValue={draft?.tag}
                        onChange={handleChange}>
                        <option value="">Choose tag..</option>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </label>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={() => { router.push('/notes/filter/all') }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                >
                    Create note +
                </button>
            </div>
        </form>
    );
}