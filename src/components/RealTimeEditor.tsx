import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller } from "react-hook-form";
import { IPostFormData } from "src/types/posts.types";

interface RealTimeEditorProps {
    name: "status" | "title" | "image" | "content" | "slug";
    control: Control<IPostFormData>;
    label: string;
    defaultValue?: string;
}

const RealTimeEditor: React.FC<RealTimeEditorProps> = ({
    name,
    control,
    label,
    defaultValue = "",
}) => {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default RealTimeEditor;
