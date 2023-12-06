import {ref, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from '../../firebaseConfig';

export const checkIfFileExists = (filePath: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const storageRef = ref(storage, filePath);

    getDownloadURL(storageRef)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          resolve(false);
        } else {
          reject(error);
        }
      });
  });
};

export const deleteAvatar = (fileName: string) => {
  const desertRef = ref(storage, 'Avatars/' + fileName);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
