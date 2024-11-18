import { permissionLevelList } from "../lib/constants";

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