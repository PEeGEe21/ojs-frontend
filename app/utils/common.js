import { contributorRolesList, permissionLevelList} from "../lib/constants";
import { supabase } from '../lib/supabase';
import { handleRedirect } from "../lib/utilFunctions";


export const getFullName = (user) =>{  
    let fullname = (user?.firstname??'') + ' ' + (user?.lastname??'');
    return fullname
}

export const getRandomRoles = () => {
    const numberOfRoles = Math.floor(Math.random() * 2) + 1;
    const shuffledRoles = permissionLevelList
      .map(role => role.id)
      .sort(() => 0.5 - Math.random());
  
    return shuffledRoles.slice(0, numberOfRoles);
};

export const getContributorRole = (role_id) =>{
  const role = contributorRolesList.find(role => role.id === parseInt(role_id));
  return role?.title?? ''
}

export const start = (role, push=null) => {
  // const role = user?.user_role;
  setTimeout(() => {
      handleRedirect(role, push);
  }, 300);
}

export const uploadFile = async (file) => {
  try {
    if (!file) {
      throw new Error('No file selected');
    }

    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`


    console.log(filePath, fileExt, 'fileExt')
    const { data, error } = await supabase.storage
      .from('uploads') // Your bucket name
      .upload(filePath, file)

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)

    // console.log(publicUrl, 'fileExt')


    return publicUrl;
  } catch (error) {
    // console.error('Upload error:', error.message);
    throw error;
  }
};