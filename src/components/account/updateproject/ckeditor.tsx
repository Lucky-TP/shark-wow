"use client"; // เพิ่มบรรทัดนี้ที่ด้านบน

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogEditor = () => {
    const [editorData, setEditorData] = useState('');

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
            
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />

            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => console.log(editorData)}
            >
                Save Blog
            </button>
        </div>
    );
};

export default BlogEditor;
