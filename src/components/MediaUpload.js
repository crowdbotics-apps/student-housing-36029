import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_TOKEN } from '../constants/Constants';
import { setPropertyDetails, updatePropertyList } from '../redux/reducers/OwnerReducer';
import { getSimplifiedError } from '../services/ApiErrorhandler';
import LocalStorage from '../services/LocalStorage';
import UploadingModal from './UploadingModal';

export default function MediaUpload({ uploading, data, closeModal, propertyId }) {
    const dispatch = useDispatch();

    console.log('propertyId: ', propertyId);
      
    useEffect(() => {
      if(uploading) uploadMedia(data, propertyId);
    }, [uploading]);


    const uploadMedia = async (data, propertyId) => { 
        const formData = new FormData();
        data.forEach((file, i) => {
          if(file.uri)
            formData.append(`prop_media`, file, file.name);
        });
        const token = await LocalStorage.getData(AUTH_TOKEN); 
        console.log('formData: ', formData);
        try {
          let response = await fetch(
            `https://www.studenthousingbyowner.com/api/v1/property/${propertyId}/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `token ${token}`
                },
                body: formData
            }
          );
            const result = await response.json();
            console.log('uploadMedia data: ', result);
            closeModal();
            if(result && result.property){
              dispatch(updatePropertyList({ id: propertyId, property: result.property }));
              dispatch(setPropertyDetails(result.property));
            }
            else if(result.error){
              alert(getSimplifiedError(result.error))    
            }
        } catch (error) {
          closeModal();
          console.error({error});
          alert(getSimplifiedError(error))
        } 
      }
    return (
        <UploadingModal uploading={uploading} />
    )
}
