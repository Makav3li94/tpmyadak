import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react'

const Tinymce = ({value, what, setData}) => {
    const editorRef = useRef(null);
    const handleEditorChange = (content) => {
        setData(what, content)
    }
    return (
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            apiKey="7eb0iwo09eiaf94h6xdhr6xe8feiourwa44k1k09zp2jreum"
            name="about"
            value={value}

            init={{
                height: 200,
                menubar: true,
                directionality: "rtl",
                plugins: [
                    'directionality', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'quickbars'
                ],
                toolbar: 'undo redo | blocks | bold italic underline forecolor | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save  |   image   link   | ltr rtl',
                toolbar_sticky: true,
                content_style: 'body { font-family:IRANSans,sans-serif; font-size:14px }',
                extended_valid_elements : "img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name|loading=lazy]",
                image_title: true,
                language:'fa',
                automatic_uploads: true,
                images_upload_url: route('admin.tiny.upload'),
                file_picker_types: 'image',
                file_picker_callback: function(cb, value, meta) {
                    let input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function() {
                        let file = this.files[0];

                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            let id = 'blobid' + (new Date()).getTime();
                            let blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                            let base64 = reader.result.split(',')[1];
                            let blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            cb(blobInfo.blobUri(), { title: file.name });
                        };
                    };
                    input.click();
                }

            }}
            onEditorChange={handleEditorChange}
        />
    )
}

export default Tinymce
