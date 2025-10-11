import React, {useEffect} from "react";
import {useDropzone} from "react-dropzone";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
export default function ImgDropzone({files, setFiles, showDelete = true, handleNew}) {
    useEffect(() => {
    }, [files, setFiles]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            handleNew()
        }
    });
    const removeFile = file => () => {
        const newFiles = [...files]
        newFiles.splice(newFiles.indexOf(file), 1)
        setFiles(newFiles)
        handleNew()
    }

    const removeAll = () => {
        setFiles([])
        handleNew()
    }
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            {showDelete &&
                <button className="btn btn-ghost " onClick={removeFile(file)}>X</button>
            }
            <div style={thumbInner}>
                <img alt='kadooyab'
                     src={file.preview}
                     style={img}
                    // Revoke data uri after image is loaded
                     onLoad={() => {
                         URL.revokeObjectURL(file.preview)
                     }}
                />
            </div>
        </div>
    ));


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className="container bg-base-300 p-5">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>تصاویر و ویدئو ها را اینجا بکشید.</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            {files.length > 0 && <button onClick={removeAll}>حذف همه</button>}
        </section>
    );
}
