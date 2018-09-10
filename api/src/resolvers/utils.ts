import * as bcrypt from 'bcryptjs';

import * as jwt from 'jsonwebtoken';

export const signToken = (user) =>
  jwt.sign(user, process.env.APP_SECRET)

export const hashPass = async password => await bcrypt.hash(password, 10)

export const onlyValues = (data) => {
    const {
        __s3db,
        getId,
        isModified,
        getMetadata,
        save,
        delete: del,
        refresh,
        rename,
        copyTo,
        getHead,
        ...rest
    } = data;
    return rest;
}

export const getUserData = (userData) =>
{
    // no returning the password to the browser!
    const {  password, ...result } = onlyValues(userData);
    return result
}