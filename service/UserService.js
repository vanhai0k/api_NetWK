const { Promise } = require('mongoose');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt')

// import { userModel } from '../models/user.model';
// import { Promise } from 'mongoose';
// import bcrypt from 'bcrypt'


// export const loginUserService =  ( {email, passwd}) => {
exports.loginUserService = async ( email, passwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            if(isEmail){
                const useDb = await userModel.find({email: email})
                if(useDb) {
                    const checkPassword = bcrypt.compareSync(passwd, useDb[0].passwd);
                    if(checkPassword){
                        const access_token = generalAcessToken({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id })
                        const refresh_token = generalRefreshToken({ isAdmin: useDb[0].isAdmin, _id: useDb[0]._id })
                        resolve({
                            status: 'OK',
                            data: {
                                access_token,
                                refresh_token
                            }
                        })
                    }
                    resolve({
                        status: 'err',
                        message: "The user name or password is wrong"
                    })
                }else {
                    resolve({
                        status: 'err',
                        message: 'the user name is not existed'
                    })
                }
            }else {
                resolve({
                    status: 'err',
                    message: 'user name is not a email'
                })
            }
        } catch (error) {
            reject({
                message: error,
                status: 'err'
            })
        }
    }).catch((e) => console.log(e))
}