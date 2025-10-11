import React, {useEffect, useRef, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Button} from "@/components/index/index.js";
import Modal from "@/components/daisy-ui/modal.jsx";
const ImageCropper = ({image,setCroppedImage}) => {
    const [show, setShow] = useState(true);
    const cropperRef = useRef();
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            // setCroppedImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    setCroppedImage(reader.result);
                    handleClose();
                }
            }, 'image/webp');
        }
    };
    const handleClose = () => setShow(false);
    return (
        <Modal isOpen={show} onClose={handleClose} title={'ویرایش تصویر'}>
            <div className="form-control space-y-2.5">
                <div class="">
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                    />
                </div>
                <div className="flex items-center space-x-2 mt-4 justify-around">
                    <Button  onClick={getCropData} type="primary">
                        ساخت
                    </Button>
                    <Button onClick={handleClose} type="secondary">
                        انصراف
                    </Button>
                </div>
            </div>
        </Modal>

    );
}

export default ImageCropper
