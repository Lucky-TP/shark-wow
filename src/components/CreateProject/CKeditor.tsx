"use client"
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkeditorComponent: React.FC = () => {
  const [editorData, setEditorData] = useState<string>('');

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
    console.log('Editor data:', data); // Log the editor data, for testing
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
      <div>
        <h3>Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
    </div>
  );
};

export default CkeditorComponent;
