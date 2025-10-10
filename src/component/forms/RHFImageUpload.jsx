// components/forms/RHFImageUpload.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const RHFImageUpload = ({ name, label, control, register, setValue, errors }) => {
    const [preview, setPreview] = useState(null);
    const isInvalid = errors[name];

    // Watch for file changes and set the preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            // Manually set the value in React Hook Form for file type
            setValue(name, file, { shouldValidate: true });
        } else {
            setPreview(null);
            setValue(name, null, { shouldValidate: true });
        }
    };

    // Clean up the URL object when the component unmounts
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="cp_upload_img text-center">
            {/* Display the preview image or a placeholder */}
            <div className='position-relative'>
                <Image
                    src={preview || "/images/cp_upload_img.png"}
                    width={110}
                    height={110}
                    alt='Profile Picture Preview'
                    className="rounded-circle"
                />
                <input
                    id={name}
                    type="file"
                    accept="image/*"
                    // Register the field but handle the change event manually to get the file object
                    {...register(name)}
                    onChange={handleFileChange}
                />
            </div>
            {/* Use a label to trigger the hidden file input */}
            <label htmlFor={name} className="upload-label">
                {label}
            </label>

            {/* Display the error message */}
            {isInvalid && <p className="text-danger mt-1">{isInvalid.message}</p>}
        </div>
    );
};

export default RHFImageUpload;